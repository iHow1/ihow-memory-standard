# Governance

[中文](./GOVERNANCE.zh-CN.md)

iHow Memory Standard is maintained by the stewards of the `iHow1/ihow-memory-standard` repository. At the current stage, the repository owner under `iHow1` is the active maintainer group.

This document explains who decides. `CONTRIBUTING.md` explains how to contribute.

## Maintainers and Stewards

Maintainers and stewards are responsible for:

- reviewing RFCs and pull requests;
- preserving the published scope and safety boundaries;
- deciding version promotions such as v0.x to v0.y;
- approving promotion of experimental runners to official runner classification;
- downgrading or removing runner material when it becomes misleading or unsafe.

Maintainer roles may expand as the project grows. Changes to maintainer status should be recorded in a public issue, pull request, or governance update.

## RFC Process

Use a GitHub issue with the `spec-rfc` label for material changes to:

- protocol semantics;
- reliability scenarios;
- conformance runner classification;
- fixture policy;
- namespace, safety, or audit rules.

Small wording fixes, typo fixes, and documentation clarifications do not require an RFC unless a maintainer requests one.

## Version Promotion

Promoting the standard from v0.x to v0.y requires:

- maintainer consensus;
- a public RFC discussion period of at least 7 calendar days;
- a written summary of accepted changes and deferred questions;
- no unresolved safety, privacy, or third-party endorsement concern identified by maintainers.

Emergency corrections for security or privacy boundaries may be merged faster, but the reason should be documented publicly after the fact.

## Experimental Runner Promotion

An experimental external runner may move to official classification only when all of the following are true:

- the third-party runtime has merged the referenced behavior or artifact described in the fixture;
- the fixture's pinned reference is updated to a post-merge commit on the upstream default branch;
- the third-party runtime maintainers have explicitly acknowledged the runner exists and have not objected to the official classification, or the runner is the standard's own self-conformance runtime;
- the `ihow-memory-standard` maintainers or stewards approve the promotion in writing.

Official classification changes the runner classification only. It does not imply commercial certification, endorsement, or full protocol conformance.

## Veto, Downgrade, and Removal

Maintainers of a third-party runtime may request that a runner referencing their runtime be corrected, downgraded, or removed. Maintainers of this repository should honor reasonable requests when a runner is inaccurate, stale, misleading, unsafe, or risks implying endorsement.

Repository maintainers may also downgrade or remove a runner when:

- upstream behavior diverges from the pinned fixture;
- a reference can no longer be reproduced;
- the fixture no longer satisfies public-safety policy;
- the runner wording implies endorsement or certification that was not granted.

## Relationship to Contributing

`CONTRIBUTING.md` describes useful contribution types and contribution license terms.

`GOVERNANCE.md` describes who decides, how RFCs are reviewed, and how official runner or version decisions are made.
