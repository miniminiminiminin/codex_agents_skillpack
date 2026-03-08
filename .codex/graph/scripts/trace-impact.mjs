#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const GRAPH_PATH = path.join(ROOT, ".codex/graph/dependency-graph.yaml");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readGraphFile() {
  if (!fs.existsSync(GRAPH_PATH)) {
    fail(`Missing graph file: ${GRAPH_PATH}`);
  }

  return fs.readFileSync(GRAPH_PATH, "utf8");
}

function parseScalar(raw) {
  const value = raw.trim();
  if (value === "true") return true;
  if (value === "false") return false;
  if (/^-?\d+$/.test(value)) return Number(value);
  return value;
}

function parseGraph(yamlText) {
  const lines = yamlText.split(/\r?\n/);
  const graph = { nodes: [], edges: [] };
  let section = null;
  let currentNode = null;
  let currentEdge = null;
  let currentArrayKey = null;

  for (const line of lines) {
    if (!line.trim() || line.trimStart().startsWith("#")) continue;

    if (line === "nodes:") {
      section = "nodes";
      currentNode = null;
      currentEdge = null;
      currentArrayKey = null;
      continue;
    }

    if (line === "edges:") {
      section = "edges";
      currentNode = null;
      currentEdge = null;
      currentArrayKey = null;
      continue;
    }

    if (section === "nodes") {
      const nodeStart = line.match(/^  - id:\s*(.+)$/);
      if (nodeStart) {
        currentNode = { id: parseScalar(nodeStart[1]) };
        graph.nodes.push(currentNode);
        currentArrayKey = null;
        continue;
      }

      if (!currentNode) continue;

      const arrayKey = line.match(/^    ([a-z_]+):\s*$/);
      if (arrayKey) {
        currentArrayKey = arrayKey[1];
        currentNode[currentArrayKey] = [];
        continue;
      }

      const arrayValue = line.match(/^      - (.+)$/);
      if (arrayValue && currentArrayKey) {
        currentNode[currentArrayKey].push(parseScalar(arrayValue[1]));
        continue;
      }

      const scalar = line.match(/^    ([a-z_]+):\s*(.+)$/);
      if (scalar) {
        currentArrayKey = null;
        currentNode[scalar[1]] = parseScalar(scalar[2]);
      }
      continue;
    }

    if (section === "edges") {
      const edgeStart = line.match(/^  - from:\s*(.+)$/);
      if (edgeStart) {
        currentEdge = { from: parseScalar(edgeStart[1]) };
        graph.edges.push(currentEdge);
        continue;
      }

      if (!currentEdge) continue;

      const edgeField = line.match(/^    ([a-z_]+):\s*(.+)$/);
      if (edgeField) {
        currentEdge[edgeField[1]] = parseScalar(edgeField[2]);
      }
    }
  }

  return graph;
}

function getArgs(argv) {
  const [command, ...rest] = argv;
  const flags = {};

  for (let i = 0; i < rest.length; i += 1) {
    const token = rest[i];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = rest[i + 1];
    if (!next || next.startsWith("--")) {
      flags[key] = true;
      continue;
    }
    flags[key] = next;
    i += 1;
  }

  return { command, flags };
}

function buildIndexes(graph) {
  const byId = new Map(graph.nodes.map((node) => [node.id, node]));
  const byPath = new Map(graph.nodes.map((node) => [node.path, node]));
  return { byId, byPath };
}

function resolveNode(graph, flags) {
  const { byId, byPath } = buildIndexes(graph);
  if (flags.id) {
    const node = byId.get(flags.id);
    if (!node) fail(`Unknown node id: ${flags.id}`);
    return node;
  }
  if (flags.path) {
    const node = byPath.get(flags.path);
    if (!node) fail(`Unknown node path: ${flags.path}`);
    return node;
  }
  fail("Expected --id <node-id> or --path <repo-path>");
}

function directUpstream(graph, nodeId) {
  return graph.edges.filter((edge) => edge.to === nodeId).map((edge) => edge.from);
}

function directDownstream(graph, nodeId) {
  return graph.edges.filter((edge) => edge.from === nodeId).map((edge) => edge.to);
}

function traverse(graph, startId, direction) {
  const step = direction === "upstream" ? directUpstream : directDownstream;
  const seen = new Set();
  const queue = [...step(graph, startId)];

  while (queue.length > 0) {
    const next = queue.shift();
    if (seen.has(next)) continue;
    seen.add(next);
    for (const neighbor of step(graph, next)) {
      if (!seen.has(neighbor)) queue.push(neighbor);
    }
  }

  return [...seen];
}

function formatNode(node) {
  return {
    id: node.id,
    type: node.type,
    path: node.path,
    authority_level: node.authority_level,
    local_only: node.local_only,
    owns: node.owns ?? [],
    depends_on: node.depends_on ?? [],
    change_requires_review_from: node.change_requires_review_from ?? [],
  };
}

function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}

function commandInspect(graph, flags) {
  const node = resolveNode(graph, flags);
  printJson({
    node: formatNode(node),
    incoming_edges: graph.edges.filter((edge) => edge.to === node.id),
    outgoing_edges: graph.edges.filter((edge) => edge.from === node.id),
  });
}

function commandImpact(graph, flags) {
  const node = resolveNode(graph, flags);
  const direction = flags.direction ?? "both";
  const indexes = buildIndexes(graph);
  const payload = { target: formatNode(node) };

  if (direction === "upstream" || direction === "both") {
    payload.upstream = traverse(graph, node.id, "upstream").map((id) => formatNode(indexes.byId.get(id)));
  }
  if (direction === "downstream" || direction === "both") {
    payload.downstream = traverse(graph, node.id, "downstream").map((id) => formatNode(indexes.byId.get(id)));
  }

  printJson(payload);
}

function commandSyncSet(graph, flags) {
  const node = resolveNode(graph, flags);
  const indexes = buildIndexes(graph);
  const relatedIds = new Set([
    node.id,
    ...directUpstream(graph, node.id),
    ...directDownstream(graph, node.id),
  ]);

  const files = [...relatedIds]
    .map((id) => indexes.byId.get(id))
    .filter(Boolean)
    .map((item) => item.path)
    .sort();

  printJson({
    target: node.id,
    sync_files: files,
  });
}

function commandPlanChange(graph, flags) {
  const node = resolveNode(graph, flags);
  const indexes = buildIndexes(graph);
  const upstream = directUpstream(graph, node.id).map((id) => indexes.byId.get(id)).filter(Boolean);
  const downstream = directDownstream(graph, node.id).map((id) => indexes.byId.get(id)).filter(Boolean);
  const syncFiles = new Set([node.path, ...upstream.map((item) => item.path), ...downstream.map((item) => item.path), GRAPH_PATH.replace(`${ROOT}/`, "")]);

  printJson({
    target: formatNode(node),
    preflight: {
      upstream: upstream.map(formatNode),
      downstream: downstream.map(formatNode),
      sync_files: [...syncFiles].sort(),
      required_postflight: [
        "node .codex/graph/scripts/trace-impact.mjs validate",
      ],
    },
  });
}

function commandValidate(graph) {
  const errors = [];
  const idSet = new Set();
  const pathSet = new Set();

  for (const node of graph.nodes) {
    if (idSet.has(node.id)) errors.push(`Duplicate node id: ${node.id}`);
    idSet.add(node.id);
    if (pathSet.has(node.path)) errors.push(`Duplicate node path: ${node.path}`);
    pathSet.add(node.path);
    const absolute = path.join(ROOT, node.path);
    if (!fs.existsSync(absolute)) errors.push(`Missing node path on disk: ${node.path}`);
  }

  for (const edge of graph.edges) {
    if (!idSet.has(edge.from)) errors.push(`Edge from unknown node: ${edge.from}`);
    if (!idSet.has(edge.to)) errors.push(`Edge to unknown node: ${edge.to}`);
  }

  if (errors.length > 0) {
    printJson({ ok: false, errors });
    process.exit(1);
  }

  printJson({
    ok: true,
    node_count: graph.nodes.length,
    edge_count: graph.edges.length,
  });
}

function main() {
  const { command, flags } = getArgs(process.argv.slice(2));
  if (!command) {
    fail("Usage: trace-impact.mjs <inspect|impact|sync-set|plan-change|validate> [--id <node-id> | --path <repo-path>]");
  }

  const graph = parseGraph(readGraphFile());

  switch (command) {
    case "inspect":
      commandInspect(graph, flags);
      break;
    case "impact":
      commandImpact(graph, flags);
      break;
    case "sync-set":
      commandSyncSet(graph, flags);
      break;
    case "plan-change":
      commandPlanChange(graph, flags);
      break;
    case "validate":
      commandValidate(graph, flags);
      break;
    default:
      fail(`Unknown command: ${command}`);
  }
}

main();
