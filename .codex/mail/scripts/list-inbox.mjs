#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

function fail(message) {
  console.error(message);
  process.exit(1);
}

function parseArgs(argv) {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = "true";
      continue;
    }
    args[key] = next;
    index += 1;
  }
  return args;
}

const args = parseArgs(process.argv.slice(2));
const role = args.role;
if (!role) fail("Expected --role <agent-role>");

const inboxPath = path.join(process.cwd(), ".codex", "mail", "inbox", role);
if (!fs.existsSync(inboxPath)) {
  fail(`Missing inbox: ${inboxPath}`);
}

const entries = fs
  .readdirSync(inboxPath)
  .filter((file) => file.endsWith(".json"))
  .sort()
  .map((file) => JSON.parse(fs.readFileSync(path.join(inboxPath, file), "utf8")));

process.stdout.write(`${JSON.stringify({ role, count: entries.length, messages: entries }, null, 2)}\n`);
