# iHow Memory Protocol Draft v0.1

This draft describes the public semantics of a local-first memory protocol for multi-agent work. It is a specification sketch, not a reference implementation. The goal is to define how agents, tools, and human operators can write durable work events, retrieve bounded context, write back learned memory, and audit how a memory item was created or used.

本文档描述一个面向多 agent 工作流的本地优先记忆协议草案。它不是实现代码，而是接口语义、数据边界和验收方向。

## 1. Design Goals / 设计目标

- Local-first: project memory should remain usable inside the operator's chosen environment.
- Model-neutral: memory should not depend on one model's private session state.
- Auditable: important memories should have source, time, author, scope, and review status.
- Minimal context: agents should receive only the context required for the current task.
- Human-governed: durable memory should support review, correction, rollback, and deletion.

## 2. Core Concepts / 核心概念

### Event

An event is a factual record of something that happened in a workflow: a user instruction, a project decision, a file change, a review comment, a handoff, or a completed validation step. Events are append-oriented and should preserve provenance.

事件是工作流中已经发生的事实记录，例如用户指令、项目决策、文件变更、评审意见、交接动作或验证结果。事件应保留来源，并以追加为主。

### Context Package

A context package is the bounded set of memory items retrieved for a specific task. It is not the entire project history. It should be ranked, scoped, and small enough for the receiving agent to use safely.

上下文包是针对某个任务读取出的最小必要记忆集合，不是完整历史。它应经过排序、限定范围，并控制在接收 agent 可安全使用的大小内。

### Writeback

A writeback is a proposed durable memory item created after work has happened. It may represent a learned preference, recurring feedback pattern, hard constraint, decision, blocker, or handoff summary. Writebacks may require human review before becoming active memory.

写回是在工作发生后形成的候选持久记忆，可表示偏好、反馈规律、硬约束、决策、阻塞或交接摘要。写回可以先进入人工审核，再成为生效记忆。

### Audit Record

An audit record explains how a memory item was created, updated, retrieved, suppressed, or used. It supports traceability, debugging, compliance review, and user trust.

审计记录说明一条记忆如何被创建、更新、读取、抑制或使用，用于追溯、排错、合规审查和建立信任。

## 3. Interface Semantics / 四个核心接口语义

### 3.1 `events` — Business Event Ingestion / 业务事件写入

The `events` interface records workflow facts. It should accept structured events from agents, tools, or human operators. It should not decide which facts become durable rules; that decision belongs to writeback and review flows.

`events` 接口用于记录工作流事实。它接收来自 agent、工具或人工操作者的结构化事件，但不直接决定哪些事实会成为长期规则；长期记忆的沉淀由写回与审核流程负责。

Expected behavior:

- Accept append-oriented workflow records.
- Preserve source, actor, timestamp, scope, and event type.
- Allow later retrieval and audit.
- Reject or redact disallowed sensitive content.

### 3.2 `context` — Context Package Retrieval / 上下文包读取

The `context` interface retrieves the smallest useful memory package for a task. It should support task intent, namespace scope, budget constraints, and relevance ranking. It should return both memory content and metadata explaining why each item was included.

`context` 接口用于为当前任务读取最小可用上下文包。它应支持任务意图、命名空间范围、预算限制和相关性排序，并返回每条记忆被纳入的原因。

Expected behavior:

- Retrieve project-aware context for a specific task.
- Respect tenant, customer, project, and user boundaries.
- Prefer active, reviewed, high-confidence memory.
- Include provenance and freshness metadata.
- Avoid unrelated history and inactive rules.

### 3.3 `writeback` — Memory Proposal and Review / 记忆写回与审核

The `writeback` interface turns completed work into proposed durable memory. A writeback may be automatically proposed by an agent or manually submitted by a human. Depending on severity and policy, it may become active immediately or wait in a review queue.

`writeback` 接口将已发生的工作转化为候选持久记忆。写回可以由 agent 自动提议，也可以由人工提交。根据严重程度和策略，它可以立即生效，也可以进入审核队列。

Expected behavior:

- Classify proposed memory by type, scope, priority, and confidence.
- Separate hard constraints from soft preferences.
- Preserve source evidence for review.
- Support approve, revise, reject, disable, and delete actions.
- Keep active memory bounded and maintainable.

### 3.4 `audit` — Traceability and Control / 审计追溯

The `audit` interface explains memory lifecycle and usage. It should answer questions such as: where did this memory come from, who approved it, when was it used, which agent received it, and why was another item excluded.

`audit` 接口用于解释记忆的生命周期与使用过程。它应能回答：这条记忆来自哪里、谁审核过、何时被使用、哪个 agent 收到了它、为什么某条记忆没有被纳入上下文包。

Expected behavior:

- Trace creation, update, retrieval, suppression, and deletion.
- Record review actions and policy decisions.
- Provide human-readable explanations.
- Support dispute, rollback, and cleanup workflows.

## 4. JSON Schema Drafts / JSON 结构草案

These structures are illustrative schemas for interoperability discussions. Field names and validation details may change before a stable version.

以下结构用于讨论互操作方向，字段命名和校验细节在稳定版前仍可调整。

### 4.1 Event Object

```json
{
  "event_id": "evt_01",
  "namespace": {
    "tenant_id": "tenant_01",
    "customer_id": "customer_01",
    "project_id": "project_01",
    "user_id": "user_01"
  },
  "event_type": "decision",
  "actor": {
    "type": "agent",
    "name": "Agent A"
  },
  "occurred_at": "2026-01-01T00:00:00Z",
  "summary": "A short factual summary of what happened.",
  "source": {
    "kind": "document",
    "reference": "project-notes#section-2"
  },
  "sensitivity": "normal",
  "metadata": {
    "workflow": "handoff",
    "confidence": "observed"
  }
}
```

Field notes:

- `event_id`: stable identifier for the event.
- `namespace`: isolation scope for tenancy and retrieval.
- `event_type`: example values include `instruction`, `decision`, `handoff`, `feedback`, `validation`, and `blocker`.
- `actor`: human, agent, system, or external tool.
- `summary`: factual, short, and reviewable.
- `source`: pointer to the origin of the event.
- `sensitivity`: used for redaction and access control.

### 4.2 Context Request and Response

```json
{
  "request_id": "ctx_01",
  "namespace": {
    "tenant_id": "tenant_01",
    "customer_id": "customer_01",
    "project_id": "project_01",
    "user_id": "user_01"
  },
  "task": {
    "intent": "continue_project",
    "description": "Continue the current deliverable from the latest checkpoint."
  },
  "limits": {
    "max_items": 12,
    "max_chars": 12000
  },
  "filters": {
    "include_types": ["decision", "constraint", "handoff", "blocker"],
    "review_status": ["approved", "system_verified"]
  }
}
```

```json
{
  "request_id": "ctx_01",
  "context_items": [
    {
      "memory_id": "mem_01",
      "memory_type": "constraint",
      "priority": "high",
      "summary": "A hard project rule that must be preserved.",
      "scope": {
        "level": "project",
        "applies_to": "generation_and_review"
      },
      "provenance": {
        "source_event_id": "evt_01",
        "review_status": "approved",
        "updated_at": "2026-01-01T00:00:00Z"
      },
      "reason_included": "High-priority project constraint relevant to the requested task."
    }
  ],
  "omitted": [
    {
      "memory_id": "mem_02",
      "reason": "Outside requested project scope."
    }
  ]
}
```

Field notes:

- `limits`: keeps retrieval bounded.
- `filters`: prevents unrelated or unreviewed memory from leaking into a task.
- `reason_included`: makes retrieval explainable.
- `omitted`: supports audit without revealing content outside the allowed scope.

### 4.3 Writeback Proposal

```json
{
  "proposal_id": "wb_01",
  "namespace": {
    "tenant_id": "tenant_01",
    "customer_id": "customer_01",
    "project_id": "project_01",
    "user_id": "user_01"
  },
  "proposed_by": {
    "type": "agent",
    "name": "Agent A"
  },
  "memory_type": "feedback_pattern",
  "priority": "medium",
  "confidence": "medium",
  "summary": "A recurring feedback pattern observed across multiple revisions.",
  "evidence": [
    {
      "event_id": "evt_10",
      "note": "First observed revision."
    },
    {
      "event_id": "evt_11",
      "note": "Repeated in later revision."
    }
  ],
  "activation": {
    "status": "pending_review",
    "review_required": true
  },
  "retention": {
    "policy": "project_lifecycle",
    "expires_at": null
  }
}
```

Field notes:

- `memory_type`: example values include `preference`, `feedback_pattern`, `hard_constraint`, `decision`, `blocker`, and `handoff_summary`.
- `priority`: used during context selection.
- `confidence`: distinguishes repeated evidence from a single weak signal.
- `activation`: prevents fragile or sensitive memory from becoming active without review.
- `retention`: supports cleanup after a project ends.

### 4.4 Audit Record

```json
{
  "audit_id": "aud_01",
  "namespace": {
    "tenant_id": "tenant_01",
    "customer_id": "customer_01",
    "project_id": "project_01",
    "user_id": "user_01"
  },
  "action": "memory_retrieved",
  "target": {
    "type": "memory",
    "id": "mem_01"
  },
  "actor": {
    "type": "system",
    "name": "retrieval_policy"
  },
  "occurred_at": "2026-01-01T00:00:00Z",
  "reason": "Relevant high-priority project constraint for the requested task.",
  "result": "included_in_context",
  "policy": {
    "scope_check": "passed",
    "sensitivity_check": "passed"
  }
}
```

Field notes:

- `action`: example values include `memory_created`, `memory_updated`, `memory_retrieved`, `memory_suppressed`, `memory_disabled`, and `memory_deleted`.
- `target`: the event, memory item, context package, or proposal affected.
- `reason`: human-readable explanation.
- `policy`: records boundary checks without exposing restricted content.

## 5. Namespace and Isolation Rules / 命名空间与隔离规则

The protocol uses four isolation layers. A compliant implementation should enforce these boundaries before retrieval, writeback activation, or audit exposure.

协议采用四层隔离。合规实现应在读取、写回生效或审计暴露前执行这些边界。

### `tenant`

The top-level organizational boundary. Data from one tenant must not be visible to another tenant.

最高组织边界。一个 tenant 的数据不得被另一个 tenant 读取。

### `customer`

The business relationship or external account boundary. Customer-scoped memory should not cross into another customer by default.

业务关系或外部账户边界。默认情况下，一个 customer 的记忆不得进入另一个 customer。

### `project`

The active work boundary. Project-scoped memory may include deliverables, decisions, blockers, and constraints. It should be the default retrieval scope for most agent tasks.

具体工作项目边界。project 记忆可包含产物、决策、阻塞和约束，通常是 agent 任务的默认读取范围。

### `user`

The human operator or assignee boundary. User-scoped memory may include working preferences, accessibility needs, or private notes. It should only be used when the user is authorized and the task requires it.

人类操作者或负责人边界。user 记忆可包含工作偏好、辅助需求或私人备注，仅在授权且任务需要时使用。

### Boundary Rules

- Retrieval must be denied when the request namespace is broader than the caller is allowed to access.
- Writeback must not silently widen scope from project to customer or tenant.
- Shared memory must state its scope explicitly.
- Cross-project reuse requires either an approved shared rule or a human action.
- Audit views must not reveal restricted content through explanations.

## 6. Safety Boundaries / 安全边界

The protocol should reject, redact, or quarantine content that is unsafe to store as durable memory.

协议应拒绝、脱敏或隔离不适合成为持久记忆的内容。

Content that should not be stored as ordinary memory:

- Passwords and login secrets.
- Access credentials, session strings, signing secrets, or private keys.
- Complete personal contact details unless explicitly allowed by policy.
- Full payment, identity, or medical records.
- Raw private conversations unrelated to the active task.
- Content from a namespace the caller is not allowed to access.

Recommended controls:

- Redaction before event acceptance.
- Review queue for high-sensitivity writebacks.
- Scope checks before retrieval.
- Audit records for inclusion, exclusion, revision, and deletion.
- Human-readable deletion and rollback paths.

## 7. Compliance Test Preview / 一致性测试预告

A future conformance suite should test whether an implementation satisfies the reliability scenarios and protocol boundaries. The suite should focus on behavior, not storage technology.

后续一致性测试应验证实现是否满足可靠性场景和协议边界，重点测试行为，而不是限定具体存储技术。

Candidate tests:

- Cross-tool handoff preserves completed work, open blockers, and constraints.
- Repeated feedback becomes a scoped pattern only after enough evidence.
- Hard constraints are retrieved before relevant generation or action.
- Human onboarding package separates facts, decisions, assumptions, blockers, and next steps.
- Model migration preserves project memory semantics across compatible clients.
- Namespace isolation prevents cross-tenant, cross-customer, and unrelated project leakage.
- Audit can explain why a memory item was included or excluded.

## 8. Non-Goals for v0.1 / v0.1 非目标

- This draft does not define a storage engine.
- This draft does not define a hosted service.
- This draft does not require a specific model provider.
- This draft does not include tool integration code or runtime internals.
- This draft does not standardize private operations.

The protocol starts with a narrow promise: agents should be able to share durable, scoped, auditable project memory without depending on hidden chat history.

这个协议的起点很窄：让 agent 能共享持久、可限定、可审计的项目记忆，而不是依赖不可控的隐藏会话历史。
