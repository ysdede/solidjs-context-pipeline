---
source_repo: solid
source_path: solid\packages\solid\src\render\Suspense.ts
domain: ssr
extracted_at: "2026-02-01T15:19:27.058Z"
primitive: Suspense
---

---
source_repo: solid
source_path: solid\packages\solid\src\render\Suspense.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.058Z"
---

## API Documentation 1

**[experimental]** Controls the order in which suspended content is rendered
@description https://docs.solidjs.com/reference/components/suspense-list

## API Documentation 2

Tracks all resources inside a component and renders a fallback until they are all resolved
```typescript
const AsyncComponent = lazy(() => import('./component'));
<Suspense fallback={<LoadingIndicator />}>
<AsyncComponent />
</Suspense>
```
@description https://docs.solidjs.com/reference/components/suspense
