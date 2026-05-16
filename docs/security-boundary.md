# Security Boundary

iHow Memory is designed around scoped, auditable memory rather than unrestricted recall.

## Namespace Isolation

A compatible system should enforce isolation before retrieval, writeback activation, or audit exposure:

- tenant scope
- customer scope
- project scope
- user scope

Memory from one scope should not leak into another scope unless policy explicitly allows it and the audit trail records why.

## Sensitive Data

Public examples should avoid secrets, credentials, private account data, private customer data, raw private conversations, and operational internals.

Systems implementing this protocol should support redaction, review queues, scope checks, audit records, deletion, and rollback.

## v0.1 Boundary

This repository describes the security boundary at the specification level only. It does not publish runtime internals or private operations.
