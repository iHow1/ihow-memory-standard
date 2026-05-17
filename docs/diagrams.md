# iHow Memory Diagrams

These diagrams explain the v0.1 mechanism at different levels of detail.

## 1. Non-Technical Overview

```mermaid
flowchart LR
  H["Human operator"] --> A["Agent A"]
  A --> N["Shared project notebook"]
  N --> B["Agent B"]
  N --> C["Agent C"]
  N --> R["Review and audit"]
  B --> O["Continued work"]
  C --> O
```

The simplest view: iHow Memory is a shared, reviewed project notebook for multiple AI agents.

## 2. Memory Lifecycle

```mermaid
flowchart TD
  E["Event: something happened"] --> P["Proposal: should this become durable memory?"]
  P --> S{"Scope and sensitivity check"}
  S -->|"Reject or redact"| X["Blocked or revised"]
  S -->|"Allowed"| R["Review queue or policy approval"]
  R --> A["Active memory"]
  A --> C["Context package for future task"]
  C --> U["Agent uses memory"]
  U --> L["Audit record"]
  A --> D["Disable, revise, or delete"]
  D --> L
```

This is the core mechanism: raw work is not automatically trusted. Important facts become proposed memory, then pass through scope, sensitivity, and review controls.

## 3. Four Core Interfaces

```mermaid
flowchart LR
  subgraph Inputs["Inputs"]
    I1["Human instruction"]
    I2["Agent action"]
    I3["Tool result"]
    I4["Validation result"]
  end

  I1 --> EV["events"]
  I2 --> EV
  I3 --> EV
  I4 --> EV

  EV --> WB["writeback"]
  WB --> MEM["scoped memory store"]
  MEM --> CTX["context"]
  CTX --> AG["receiving agent"]
  MEM --> AUD["audit"]
  WB --> AUD
  CTX --> AUD
```

The protocol is intentionally small: record events, propose durable memory, retrieve bounded context, and audit lifecycle and usage.

## 4. Multi-Agent Handoff

```mermaid
sequenceDiagram
  participant User
  participant AgentA as Agent A
  participant Memory as iHow Memory
  participant AgentB as Agent B
  participant Audit

  User->>AgentA: Start project work
  AgentA->>Memory: Record events and propose writebacks
  Memory->>Memory: Review, scope, and activate memory
  User->>AgentB: Continue in a new tool or session
  AgentB->>Memory: Request context package for current task
  Memory->>AgentB: Return decisions, constraints, blockers, and next steps
  AgentB->>Audit: Record which memory was used
  AgentB->>User: Continue without asking for full history again
```

The handoff target is explicit: the next agent should receive the smallest useful context package, not the entire raw history.

## 5. Namespace Isolation

```mermaid
flowchart TD
  T["Tenant"] --> C1["Customer A"]
  T --> C2["Customer B"]
  C1 --> P1["Project A1"]
  C1 --> P2["Project A2"]
  C2 --> P3["Project B1"]
  P1 --> U1["User scope"]
  P2 --> U2["User scope"]
  P3 --> U3["User scope"]

  X["Context request"] --> G{"Allowed scope?"}
  G -->|"Yes"| OK["Return bounded context"]
  G -->|"No"| NO["Deny and audit"]
```

Memory retrieval should respect tenant, customer, project, and user boundaries before returning context.

## 6. v0.1 Public Boundary

```mermaid
flowchart LR
  subgraph Public["v0.1 public repository"]
    P1["Whitepaper"]
    P2["Protocol draft"]
    P3["Reliability scenarios"]
    P4["Conformance specification"]
    P5["Diagrams and docs"]
  end

  subgraph Excluded["Not included in v0.1"]
    E1["Tool integration code"]
    E2["SDKs"]
    E3["Runtime services"]
    E4["Hosted service code"]
    E5["Private operations"]
    E6["Customer-specific materials"]
  end
```

The public draft defines the reliability language first. Implementation details can be considered later, under a separate release and license decision.
