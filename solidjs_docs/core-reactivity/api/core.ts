---
source_repo: signals
source_path: signals\src\core\core.ts
domain: core-reactivity
extracted_at: "2026-02-01T15:19:27.047Z"
---

---
source_repo: signals
source_path: signals\src\core\core.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.047Z"
---

## API Documentation 1

Returns the current value stored inside the given compute function without triggering any
dependencies. Use `untrack` if you want to also disable owner tracking.

## API Documentation 2

Creates a new non-tracked reactive context with manual disposal
@param fn a function in which the reactive state is scoped
@returns the output of `fn`.
@description https://docs.solidjs.com/reference/reactive-utilities/create-root

## API Documentation 3

Runs the given function in the given owner to move ownership of nested primitives and cleanups.
This method untracks the current scope.
Warning: Usually there are simpler ways of modeling a problem that avoid using this function
