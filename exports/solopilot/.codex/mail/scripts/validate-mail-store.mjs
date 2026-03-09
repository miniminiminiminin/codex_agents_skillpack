#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const mailRoot = path.join(process.cwd(), ".codex", "mail");
const messagesDir = path.join(mailRoot, "messages");
const threadsDir = path.join(mailRoot, "threads");

function fail(message) {
  console.error(message);
  process.exit(1);
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function requireString(value, field, file) {
  if (typeof value !== "string" || value.length === 0) {
    fail(`${file}: expected non-empty string at ${field}`);
  }
}

function requireArray(value, field, file) {
  if (!Array.isArray(value)) {
    fail(`${file}: expected array at ${field}`);
  }
}

function loadFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".json")).sort();
}

const validTypes = new Set(["request", "response"]);
const validStatuses = new Set(["open", "completed", "blocked"]);
const messages = new Map();

for (const file of loadFiles(messagesDir)) {
  const fullPath = path.join(messagesDir, file);
  const message = readJson(fullPath);
  requireString(message.id, "id", file);
  requireString(message.thread_id, "thread_id", file);
  requireString(message.from, "from", file);
  requireString(message.to, "to", file);
  requireString(message.subject, "subject", file);
  requireString(message.body, "body", file);
  requireString(message.created_at, "created_at", file);
  requireArray(message.artifacts, "artifacts", file);
  if (!validTypes.has(message.type)) fail(`${file}: invalid type ${message.type}`);
  if (!validStatuses.has(message.status)) fail(`${file}: invalid status ${message.status}`);
  if (message.from === message.to) fail(`${file}: sender and receiver must differ`);
  if (message.type === "response" && typeof message.reply_to !== "string") {
    fail(`${file}: responses require string reply_to`);
  }
  if (message.type === "request" && message.reply_to !== null) {
    fail(`${file}: requests require null reply_to`);
  }
  messages.set(message.id, message);
}

for (const [id, message] of messages) {
  if (message.reply_to && !messages.has(message.reply_to)) {
    fail(`${id}: reply_to points to missing message ${message.reply_to}`);
  }
}

for (const file of loadFiles(threadsDir)) {
  const thread = readJson(path.join(threadsDir, file));
  requireString(thread.id, "id", file);
  requireString(thread.subject, "subject", file);
  requireString(thread.owner, "owner", file);
  requireString(thread.created_at, "created_at", file);
  requireString(thread.updated_at, "updated_at", file);
  requireArray(thread.participants, "participants", file);
  requireArray(thread.message_ids, "message_ids", file);
  if (!validStatuses.has(thread.status)) fail(`${file}: invalid status ${thread.status}`);
  if (thread.message_ids.length === 0) fail(`${file}: thread must contain message_ids`);
  for (const messageId of thread.message_ids) {
    if (!messages.has(messageId)) {
      fail(`${file}: thread references missing message ${messageId}`);
    }
    if (messages.get(messageId).thread_id !== thread.id) {
      fail(`${file}: message ${messageId} points to a different thread`);
    }
  }
}

process.stdout.write("mail store valid\n");
