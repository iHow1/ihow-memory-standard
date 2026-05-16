# Memory Reliability Scenarios v0.1

This document defines five public reliability scenarios for persistent memory systems used in multi-agent work. Each scenario is written as an acceptance-oriented test: a system should be able to pass the scenario without relying on hidden chat history, one-off manual notes, or a single model's private session state.

这些场景不是完整实现说明，而是公开验收标准。它们用于判断一个记忆系统是否真正解决了跨会话、跨工具、跨人员协作中的“AI 失忆”问题。

## Scenario 1: Cross-Tool Handoff / 跨工具接力

### Given (触发)

A user starts a project with Agent A. During the work, Agent A records the current objective, completed steps, important decisions, unresolved blockers, and the next recommended action. Later, the user switches to Agent B and asks it to continue the same project.

用户先用 Agent A 开始一个项目。过程中，Agent A 已经沉淀了当前目标、已完成步骤、关键决策、未解决阻塞和下一步建议。之后用户切换到 Agent B，并要求继续同一个项目。

### When (系统应做)

The memory system should identify the active project, retrieve the smallest sufficient context package, and present it to Agent B in a way that preserves task state without exposing unrelated history. Agent B should be able to continue from the last durable checkpoint, not from the beginning.

系统应识别当前项目，读取最小必要上下文包，并以 Agent B 可使用的方式交接任务状态。Agent B 应从最近的可靠检查点继续，而不是要求用户重新解释项目背景。

### Then (期望结果)

Agent B can state what has already been done, what must not be changed, what remains unresolved, and what it will do next. It should avoid repeating completed work and should preserve prior decisions unless the user explicitly changes direction.

Agent B 能说明已经完成什么、哪些边界不能动、当前阻塞是什么，以及下一步将做什么。它不应重复已完成工作，也不应无故推翻已有决策。

### 失败模式

- Agent B asks the user to restate the whole background.
- Agent B repeats work that Agent A already completed.
- Agent B misses an unresolved blocker and proceeds on a false assumption.
- Agent B changes a prior decision without surfacing that it is doing so.

### 验收标准

- Agent B summarizes the prior state with no material omission.
- Agent B names at least one completed item, one open item, and one preserved constraint.
- The next action follows the recorded project state.
- No unrelated project or user context appears in the handoff.

## Scenario 2: Feedback Pattern Capture / 反馈规律沉淀

### Given (触发)

Across several iterations, a user or reviewer gives repeated feedback in the same direction. The feedback may be phrased differently each time, but the underlying pattern is stable, such as preferring a calmer tone, avoiding an overpromising claim, or using a specific structure for deliverables.

在多轮迭代中，用户或评审者多次给出同方向反馈。每次表达可能不同，但底层规律稳定，例如偏好更克制的语气、避免过度承诺，或要求交付物采用固定结构。

### When (系统应做)

The memory system should detect that the repeated feedback represents a reusable pattern. It should write back a concise rule with source references, confidence level, scope, and review status. Future agents should retrieve the rule before producing similar work.

系统应识别这些反馈构成可复用规律，并写回一条简洁规则，包含来源、置信度、适用范围和审核状态。后续 agent 在处理类似任务前应读取并应用该规律。

### Then (期望结果)

Future outputs should apply the learned pattern without waiting for the user to repeat the same correction. The system should still allow the user to inspect, revise, disable, or narrow the rule when the pattern no longer applies.

后续输出应主动应用该规律，不再等待用户重复指出同一问题。同时，系统应允许用户查看、修改、停用或收窄该规则的适用范围。

### 失败模式

- The system stores each feedback item as isolated history but never extracts a reusable pattern.
- The system overgeneralizes one comment into a global rule.
- The system applies the rule to unrelated projects.
- The system hides the source of the learned rule, making it impossible to audit.

### 验收标准

- A repeated pattern is converted into a concise memory rule.
- The rule includes scope, source, confidence, and review status.
- A future output demonstrates the rule being applied.
- The user can trace why the rule exists and can revise it.

## Scenario 3: Constraint Preservation / 禁忌约束执行

### Given (触发)

A user defines a hard constraint for a project. The constraint may be legal, brand, privacy, quality, or workflow related. For example, a project may prohibit a certain claim type, require a specific review step, or forbid exposing certain categories of information.

用户为项目定义一条硬约束。该约束可能来自合规、品牌、隐私、质量或工作流要求。例如，项目可能禁止某类表述、要求特定审核步骤，或禁止暴露某类信息。

### When (系统应做)

The memory system should store the constraint as a high-priority project rule, separate it from ordinary preferences, and inject it before generation or action. If an agent is about to violate the constraint, the system should block, warn, or request human confirmation depending on severity.

系统应将该约束作为高优先级项目规则保存，并与普通偏好区分。生成或执行前应自动注入该约束。若 agent 即将违反约束，系统应根据严重程度进行阻断、提醒或请求人工确认。

### Then (期望结果)

The output or action respects the constraint even after a session change, tool change, or team member change. If the user asks for something that conflicts with the constraint, the system should surface the conflict instead of silently ignoring the rule.

即使发生会话切换、工具切换或成员更换，输出和操作仍应遵守该约束。如果用户提出与约束冲突的要求，系统应明确提示冲突，而不是静默忽略规则。

### 失败模式

- The constraint is stored as casual context and is not retrieved when needed.
- The constraint is applied inconsistently across agents.
- The system allows a violation without warning.
- The system blocks harmless work because it cannot distinguish hard constraints from soft preferences.

### 验收标准

- The constraint is stored with priority, scope, source, and status.
- Later agents retrieve the constraint before relevant work.
- A deliberate conflict is detected and surfaced.
- Soft preferences and hard constraints remain distinguishable.

## Scenario 4: Human Team Handoff / 新人接手

### Given (触发)

A new person joins an ongoing AI-assisted project. The project has prior decisions, partial deliverables, open questions, user preferences, quality constraints, and unresolved risks. The new person needs to become useful quickly without reading the entire raw history.

一个新人接手正在进行的 AI 辅助项目。该项目已有历史决策、阶段产出、开放问题、用户偏好、质量约束和未解决风险。新人需要快速进入状态，而不是通读全部原始记录。

### When (系统应做)

The memory system should provide a human-readable onboarding package. The package should include project goal, current state, decision log, key constraints, important artifacts, unresolved blockers, and recommended next steps. It should also show where each important claim came from.

系统应生成一份适合人阅读的接手包，包含项目目标、当前状态、决策记录、关键约束、重要产物、未解决阻塞和建议下一步。同时，每个重要结论都应能追溯来源。

### Then (期望结果)

The new person can explain the project state, avoid repeating settled discussions, and safely continue work with an agent. They should know what is confirmed, what is uncertain, and what requires human judgment.

新人能够复述项目状态，避免重复已经解决的讨论，并能安全地继续与 agent 协作。他们应知道哪些内容已确认、哪些仍不确定、哪些需要人工判断。

### 失败模式

- The handoff package is a long dump of raw logs.
- Important decisions are missing or mixed with outdated assumptions.
- The package hides uncertainty and presents guesses as facts.
- The new person cannot tell which artifacts are current.

### 验收标准

- The onboarding package is short enough to read quickly.
- It separates facts, decisions, assumptions, blockers, and next steps.
- It links important claims to their sources.
- A new person can continue the next task without asking for full project history.

## Scenario 5: Model Migration / 跨模型迁移

### Given (触发)

A team uses one model or provider for part of a project, then switches to another model or provider for cost, capability, availability, privacy, or policy reasons. The project memory should remain usable across that change.

团队在项目一部分阶段使用某个模型或供应方，之后因成本、能力、可用性、隐私或策略原因切换到另一个模型或供应方。项目记忆应在切换后继续可用。

### When (系统应做)

The memory system should store durable project facts, decisions, constraints, and summaries in a model-neutral format. The context package should be adapted to the receiving model's limits, but the meaning of the memory should remain stable.

系统应以模型无关格式保存持久项目事实、决策、约束和摘要。上下文包可以根据接收模型的限制做适配，但记忆语义应保持稳定。

### Then (期望结果)

The new model can continue the project with equivalent project awareness. It should not rely on hidden state from the previous model. Differences in wording are acceptable; loss of important project facts, constraints, or decisions is not.

新模型应具备等价的项目理解能力，能够继续工作，而不依赖前一个模型的隐藏会话状态。措辞变化可以接受，关键事实、约束或决策丢失不可接受。

### 失败模式

- Memory is stored in a prompt format that only one model can use.
- The new model misses important project constraints after migration.
- The context package exceeds the receiving model's practical limits and becomes unusable.
- Migration changes the meaning of a decision or removes its source.

### 验收标准

- The same project state can be retrieved by two different model-facing clients.
- The receiving model preserves key facts, decisions, and constraints.
- The context package is bounded and usable.
- Source traceability survives the migration.
