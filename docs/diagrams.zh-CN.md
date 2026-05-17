# iHow Memory 机制图

这些图从不同层次解释 v0.1 的机制。

## 1. 非技术总览

```mermaid
flowchart LR
  H["人类操作者"] --> A["Agent A"]
  A --> N["共享项目笔记本"]
  N --> B["Agent B"]
  N --> C["Agent C"]
  N --> R["审核与审计"]
  B --> O["继续工作"]
  C --> O
```

最简单的理解：iHow Memory 是给多个 AI Agent 共用的、经过审核的项目笔记本。

## 2. 记忆生命周期

```mermaid
flowchart TD
  E["事件: 工作中发生了什么"] --> P["提议: 是否应成为长期记忆"]
  P --> S{"范围与敏感性检查"}
  S -->|"拒绝或脱敏"| X["阻断或修订"]
  S -->|"允许"| R["审核队列或策略通过"]
  R --> A["生效记忆"]
  A --> C["给未来任务的上下文包"]
  C --> U["Agent 使用记忆"]
  U --> L["审计记录"]
  A --> D["停用、修订或删除"]
  D --> L
```

核心机制是：原始工作不会自动变成可信记忆。重要事实先成为候选记忆，再经过范围、敏感性和审核控制。

## 3. 四个核心接口

```mermaid
flowchart LR
  subgraph Inputs["输入"]
    I1["人类指令"]
    I2["Agent 动作"]
    I3["工具结果"]
    I4["验证结果"]
  end

  I1 --> EV["events"]
  I2 --> EV
  I3 --> EV
  I4 --> EV

  EV --> WB["writeback"]
  WB --> MEM["有范围的记忆库"]
  MEM --> CTX["context"]
  CTX --> AG["接收方 agent"]
  MEM --> AUD["audit"]
  WB --> AUD
  CTX --> AUD
```

协议刻意保持很小：记录事件、提出长期记忆、读取有限上下文、审计生命周期和使用过程。

## 4. 多 Agent 接力

```mermaid
sequenceDiagram
  participant User as 用户
  participant AgentA as Agent A
  participant Memory as iHow Memory
  participant AgentB as Agent B
  participant Audit as 审计

  User->>AgentA: 开始项目工作
  AgentA->>Memory: 记录事件并提出记忆写回
  Memory->>Memory: 审核、限定范围、激活记忆
  User->>AgentB: 在新工具或新会话中继续
  AgentB->>Memory: 请求当前任务上下文包
  Memory->>AgentB: 返回决策、约束、阻塞和下一步
  AgentB->>Audit: 记录使用了哪些记忆
  AgentB->>User: 不再要求用户重讲完整历史
```

接力目标很明确：下一个 agent 应该拿到小而准的上下文包，而不是完整原始历史。

## 5. 命名空间隔离

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

  X["上下文请求"] --> G{"范围允许吗"}
  G -->|"允许"| OK["返回有限上下文"]
  G -->|"不允许"| NO["拒绝并记录审计"]
```

记忆读取必须先尊重 tenant、customer、project、user 四层边界，再返回上下文。

## 6. v0.1 公开边界

```mermaid
flowchart LR
  subgraph Public["v0.1 公开仓库"]
    P1["白皮书"]
    P2["协议草案"]
    P3["可靠性场景"]
    P4["一致性测试文字规格"]
    P5["图解与文档"]
  end

  subgraph Excluded["v0.1 不包含"]
    E1["工具接入代码"]
    E2["SDK"]
    E3["运行时服务"]
    E4["托管服务代码"]
    E5["私有运维流程"]
    E6["客户特定材料"]
  end
```

公开草案先定义可靠性语言。实现细节可以在未来版本中单独讨论，并使用单独的发布和许可证决策。
