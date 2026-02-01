---
source_repo: signals
source_path: signals\src\core\context.ts
domain: core-reactivity
extracted_at: "2026-02-01T15:19:27.048Z"
---

---
source_repo: signals
source_path: signals\src\core\context.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.048Z"
---

## API Documentation 1

Context provides a form of dependency injection. It is used to save from needing to pass
data as props through intermediate components. This function creates a new context object
that can be used with `getContext` and `setContext`.
A default value can be provided here which will be used when a specific value is not provided
via a `setContext` call.

## API Documentation 2

Attempts to get a context value for the given key.
@throws `NoOwnerError` if there's no owner at the time of call.
@throws `ContextNotFoundError` if a context value has not been set yet.

## API Documentation 3

Attempts to set a context value on the parent scope with the given key.
@throws `NoOwnerError` if there's no owner at the time of call.
