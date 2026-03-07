---
name: Architecture Decision Records
description: Use this skill when making significant architectural decisions to document context, choice, and consequences consistently in ADR format.
---

# Architecture Decision Records (ADRs) - MANDATORY

**ALL significant architectural decisions MUST be documented using ADRs.**

## When to Create an ADR

Create an ADR when making decisions that require brainstorming or multiple options evaluation.

## Creating ADRs

Use the vendored ADR tools:
```bash
npm run adr new "Title of Decision"
```

ADRs are stored in `docs/architecture/decisions/` and follow this structure:
```markdown
# N. Decision Title

Date: YYYY-MM-DD

## Status
[Proposed | Accepted | Deprecated | Superseded]

## Context
What is the issue that we're seeing that is motivating this decision?

## Decision
What is the change that we're proposing and/or doing?

## Consequences
What becomes easier or more difficult to do because of this change?
```

## Examples

- ADR 0001: Record architecture decisions
- ADR 0002: Assets access management
- ADR 0003: Script serialization

## Related Resources

- `docs/architecture/decisions/` - Existing ADR history
- `npm run adr help` - ADR tooling documentation