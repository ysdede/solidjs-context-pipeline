---
source_repo: signals
source_path: signals\src\store\optimistic.ts
domain: core-reactivity
extracted_at: "2026-02-01T15:19:27.045Z"
---

---
source_repo: signals
source_path: signals\src\store\optimistic.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.045Z"
---

## API Documentation 1

Creates an optimistic store that can be used to optimistically update a value
and then revert it back to the previous value at end of transition.
```typescript
export function createOptimistic<T>(
fn: (store: T) => void,
initial: T,
options?: { key?: string | ((item: NonNullable<any>) => any); all?: boolean }
): [get: Store<T>, set: StoreSetter<T>];
```
@param fn a function that receives the current store and can be used to mutate it directly inside a transition
@param initial The initial value of the signal.
@param options Optional signal options.
@returns A tuple containing an accessor for the current value and a setter function to apply changes.
