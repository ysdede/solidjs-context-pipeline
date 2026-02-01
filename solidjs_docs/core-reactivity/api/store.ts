---
source_repo: solid
source_path: solid\packages\solid\store\src\store.ts
domain: core-reactivity
extracted_at: "2026-02-01T15:19:27.057Z"
---

---
source_repo: solid
source_path: solid\packages\solid\store\src\store.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.057Z"
---

## API Documentation 1

Returns the underlying data in the store without a proxy.
@param item store proxy object
@example
```js
const initial = {z...};
const [state, setState] = createStore(initial);
initial === state; // => false
initial === unwrap(state); // => true
```

## API Documentation 2

@deprecated

## API Documentation 3

@deprecated

## API Documentation 4

Creates a reactive store that can be read through a proxy object and written with a setter function
@description https://docs.solidjs.com/reference/store-utilities/create-store
