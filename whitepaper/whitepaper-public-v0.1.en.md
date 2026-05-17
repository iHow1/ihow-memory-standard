---
title: "iHow Memory Whitepaper"
subtitle: "Local-First Memory and Handoff Reliability for Multi-Agent AI Workflows"
version: "v0.1"
date: "2026-05-16"
author: "iHow Memory Team"
---

# iHow Memory Whitepaper v0.1

**Local-First Memory and Handoff Reliability for Multi-Agent AI Workflows**

## Executive Summary

AI agents are increasingly capable inside a single conversation, but real work rarely fits into one conversation. Projects last for weeks or months. Work moves between tools, models, sessions, and people. When project state is trapped inside private chat history, every handoff becomes a restart.

iHow Memory addresses this failure mode. It defines a local-first memory and handoff reliability layer for multi-agent workflows. The goal is to make project memory durable, scoped, auditable, and reusable across AI tools.

The v0.1 public release is an open spec draft seeking RFC-style review. It publishes the problem definition, protocol semantics, reliability scenarios, conformance direction, diagrams, and documentation. It does not publish implementation code.

## 1. The Problem

### 1.1 AI is strong in a single session and weak across long work

Most AI systems perform well when the task, context, and feedback all stay inside one chat. Real work is different. A client project may run for months. A software project may involve several AI coding tools. A research workflow may move between reading, writing, analysis, and review tools.

When the workflow crosses a session or tool boundary, the agent often forgets:

- what was already decided
- which constraints are strict
- which feedback has been repeated
- which files changed
- what is still blocked
- why a prior decision was made

The user becomes the memory bridge. This does not scale.

### 1.2 Three common forms of AI amnesia

| Failure | Practical cost |
|---|---|
| Revision amnesia | The user gives the same feedback repeatedly. |
| Tool-swap amnesia | Moving to another AI tool loses project state. |
| Handoff amnesia | A new person or agent must reread raw history before becoming useful. |

### 1.3 Why existing approaches are not enough

Vector search is useful, but similarity search is not the same as reliable project memory.

Cloud memory services can be convenient, but many teams cannot send sensitive project state to a third party.

Single-agent memory features are useful within one product, but they do not create a shared memory layer across tools.

Manual documentation helps, but it depends on continuous human maintenance.

The missing layer is a shared, local-first, auditable memory control plane for multi-agent work.

## 2. Positioning

### 2.1 One-sentence definition

iHow Memory is the local-first memory and handoff reliability layer for multi-agent AI workflows.

### 2.2 What it is not

iHow Memory is not:

- a general chat memory feature
- a vector database replacement
- a single-agent framework
- a hosted SaaS product
- an implementation release in v0.1

### 2.3 What it is

iHow Memory is:

- a standard vocabulary for durable project memory
- a protocol draft for memory events, context retrieval, writeback, and audit
- a set of reliability scenarios for testing whether a memory system actually helps handoff
- a security boundary for scoped memory across tenant, customer, project, and user contexts
- a conformance direction for future compatibility testing

## 3. Core Design Principles

### 3.1 Local-first

Project memory should remain usable inside the operator's chosen environment. Cloud services can be optional, but the default mental model is local-first.

### 3.2 Human-readable and auditable

Important memory should have source, scope, time, review status, and lifecycle controls. It should be possible to inspect, revise, disable, or delete memory.

### 3.3 Model-neutral

Memory semantics should not depend on one LLM provider or one product's private session state.

### 3.4 Multi-agent native

Handoff is a first-class reliability target. Agent A should be able to record durable project state, and Agent B should be able to continue in a new session without asking the user to repeat everything.

### 3.5 Conformance over implementation

The public standard should define observable behavior. Storage technology and runtime architecture can vary.

### 3.6 Safety boundaries by default

Memory systems should avoid uncontrolled recall. Sensitive data should be redacted, scoped, reviewed, or blocked according to policy.

## 4. Five Reliability Scenarios

The v0.1 scenario set defines five acceptance-style tests:

1. Cross-Tool Handoff: completed work, blockers, constraints, and next steps survive a tool change.
2. Feedback Pattern Capture: repeated feedback becomes a scoped pattern only after enough evidence.
3. Constraint Preservation: hard constraints are retrieved before relevant generation or action.
4. Human Team Handoff: a new person can understand the project state without reading raw history.
5. Model Migration: project memory semantics remain stable across different model-facing clients.

Each scenario includes Given, When, Then, failure modes, and acceptance criteria.

## 5. Protocol Draft

The protocol draft defines four core interfaces.

### 5.1 `events`

The `events` interface records workflow facts: user instructions, decisions, file changes, review comments, validation results, handoffs, and blockers.

### 5.2 `context`

The `context` interface retrieves the smallest useful memory package for the current task. It should respect scope boundaries and return provenance metadata.

### 5.3 `writeback`

The `writeback` interface turns completed work into proposed durable memory. Depending on policy, a writeback may require human review before activation.

### 5.4 `audit`

The `audit` interface explains where memory came from, when it changed, why it was retrieved, and how it was used.

## 6. Validation Direction

The public v0.1 material publishes validation direction, not benchmark results. Its public review surface is behavioral: scenarios, protocol semantics, isolation boundaries, and audit expectations. Executable conformance tooling may be considered after the spec boundary is stable.

The most important public principle is behavioral validation:

- Can a system preserve project state across tools?
- Can it separate hard constraints from soft preferences?
- Can it explain why memory was used?
- Can it prevent unrelated project leakage?
- Can it support review, rollback, and deletion?

## 7. Open Spec Draft Invitation

AI memory should not be locked inside one vendor's chat history. The ecosystem needs a shared way to discuss durable, scoped, auditable memory.

The v0.1 public repository includes:

- protocol semantics
- reliability scenarios
- conformance specification direction
- diagrams
- non-technical explanations
- security and namespace boundary notes

It intentionally excludes:

- tool integration code
- SDKs
- runtime services
- hosted service code
- deployment recipes
- private operations
- customer-specific materials
- generated benchmark data

## 8. Roadmap

### v0.1

- Public whitepaper
- Protocol draft
- Five reliability scenarios
- Conformance direction
- Bilingual documentation
- Diagrams and non-technical overview

### v0.2 to v0.3

- More reliability scenarios
- More precise conformance criteria
- More detailed audit semantics
- More security and namespace test cases
- Community feedback and terminology cleanup

### v0.4 and later

Future releases may consider executable conformance tooling or implementation artifacts, but those decisions should happen separately from the v0.1 spec draft.

## 9. Closing

AI work should be continuous.

Users should not have to rebuild project context every time the tool, model, chat window, or teammate changes. iHow Memory starts with a narrow public promise: define a shared reliability language for agent memory before publishing implementation details.
