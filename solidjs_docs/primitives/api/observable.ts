---
source_repo: solid
source_path: solid\packages\solid\src\reactive\observable.ts
domain: primitives
extracted_at: "2026-02-01T15:19:27.061Z"
---

---
source_repo: solid
source_path: solid\packages\solid\src\reactive\observable.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.061Z"
---

## API Documentation 1

Creates a simple observable from a signal's accessor to be used with the `from` operator of observable libraries like e.g. rxjs
```typescript
import { from } from "rxjs";
const [s, set] = createSignal(0);
const obsv$ = from(observable(s));
obsv$.subscribe((v) => console.log(v));
```
description https://docs.solidjs.com/reference/reactive-utilities/observable
