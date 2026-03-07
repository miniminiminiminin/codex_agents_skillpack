# Workflows

This directory holds canonical execution flows for the repo-local Codex OS.

Expected workflows include:

- design -> plan -> fan-out -> integrate -> verify
- bottom-up module delivery
- review-gated completion
- integration after parallel worker delivery

Rules:

- workflows should define sequence and checkpoints
- keep them implementation-agnostic
- align with one orchestrator and multiple disjoint workers
