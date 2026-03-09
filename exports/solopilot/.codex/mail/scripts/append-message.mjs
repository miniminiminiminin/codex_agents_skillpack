#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const mailRoot = path.join(root, ".codex", "mail");
const messagesDir = path.join(mailRoot, "messages");
const threadsDir = path.join(mailRoot, "threads");
const inboxDir = path.join(mailRoot, "inbox");
const outboxDir = path.join(mailRoot, "outbox");

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

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function createId() {
  return `msg_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function parseArtifacts(raw) {
  if (!raw) return [];
  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeStatus(type, status) {
  if (status) return status;
  return type === "request" ? "open" : "completed";
}

const args = parseArgs(process.argv.slice(2));
const type = args.type;
const from = args.from;
const to = args.to;
const threadId = args.thread;
const subject = args.subject;
const body = args.body;
const replyTo = args["reply-to"] ?? null;

if (!type || !["request", "response"].includes(type)) {
  fail("Expected --type request|response");
}
if (!from || !to) {
  fail("Expected --from <role> and --to <role>");
}
if (from === to) {
  fail("Sender and receiver must differ");
}
if (!threadId || !subject || !body) {
  fail("Expected --thread <id>, --subject <text>, and --body <text>");
}
if (type === "response" && !replyTo) {
  fail("Responses require --reply-to <message-id>");
}

ensureDir(messagesDir);
ensureDir(threadsDir);
ensureDir(path.join(inboxDir, to));
ensureDir(path.join(outboxDir, from));

const createdAt = nowIso();
const message = {
  id: args.id ?? createId(),
  thread_id: threadId,
  type,
  from,
  to,
  subject,
  body,
  artifacts: parseArtifacts(args.artifacts),
  status: normalizeStatus(type, args.status),
  created_at: createdAt,
  reply_to: replyTo,
};

const messageFile = path.join(messagesDir, `${message.id}.json`);
if (fs.existsSync(messageFile)) {
  fail(`Message already exists: ${message.id}`);
}
writeJson(messageFile, message);

const threadFile = path.join(threadsDir, `${threadId}.json`);
let thread;
if (fs.existsSync(threadFile)) {
  thread = readJson(threadFile);
} else {
  thread = {
    id: threadId,
    subject,
    owner: type === "request" ? from : to,
    participants: [from, to],
    message_ids: [],
    status: "open",
    created_at: createdAt,
    updated_at: createdAt,
  };
}

thread.subject = thread.subject || subject;
thread.participants = [...new Set([...thread.participants, from, to])];
thread.message_ids = [...thread.message_ids, message.id];
thread.status = message.status;
thread.updated_at = createdAt;
writeJson(threadFile, thread);

const inboxPointer = path.join(inboxDir, to, `${message.id}.json`);
const outboxPointer = path.join(outboxDir, from, `${message.id}.json`);
writeJson(inboxPointer, { id: message.id, thread_id: threadId, type, from, to, subject, status: message.status });
writeJson(outboxPointer, { id: message.id, thread_id: threadId, type, from, to, subject, status: message.status });

process.stdout.write(`${messageFile}\n`);
