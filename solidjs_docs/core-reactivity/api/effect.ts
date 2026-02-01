---
source_repo: signals
source_path: signals\src\core\effect.ts
domain: core-reactivity
extracted_at: "2026-02-01T15:19:27.046Z"
---

---
source_repo: signals
source_path: signals\src\core\effect.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.046Z"
---

## API Documentation 1

Effects are the leaf nodes of our reactive graph. When their sources change, they are
automatically added to the queue of effects to re-execute, which will cause them to fetch their
sources and recompute
