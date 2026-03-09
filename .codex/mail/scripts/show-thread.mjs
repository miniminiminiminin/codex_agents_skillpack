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
const threadId = args.thread;
if (!threadId) fail("Expected --thread <thread-id>");

const mailRoot = path.join(process.cwd(), ".codex", "mail");
const threadFile = path.join(mailRoot, "threads", `${threadId}.json`);
if (!fs.existsSync(threadFile)) {
  fail(`Unknown thread: ${threadId}`);
}

const thread = JSON.parse(fs.readFileSync(threadFile, "utf8"));
const messages = thread.message_ids.map((messageId) => {
  const file = path.join(mailRoot, "messages", `${messageId}.json`);
  return JSON.parse(fs.readFileSync(file, "utf8"));
});

process.stdout.write(`${JSON.stringify({ thread, messages }, null, 2)}\n`);
