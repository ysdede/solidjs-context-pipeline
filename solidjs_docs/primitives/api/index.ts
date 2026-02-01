---
source_repo: solid
source_path: solid\packages\solid\web\src\index.ts
domain: primitives
extracted_at: "2026-02-01T15:19:27.056Z"
---

---
source_repo: solid
source_path: solid\packages\solid\web\src\index.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.056Z"
---

## API Documentation 1

Renders components somewhere else in the DOM
Useful for inserting modals and tooltips outside of an cropping layout. If no mount point is given, the portal is inserted in document.body; it is wrapped in a `<div>` unless the target is document.head or `isSVG` is true. setting `useShadow` to true places the element in a shadow root to isolate styles.
@description https://docs.solidjs.com/reference/components/portal

## API Documentation 2

Renders an arbitrary component or element with the given props
This is a lower level version of the `Dynamic` component, useful for
performance optimizations in libraries. Do not use this unless you know
what you are doing.
```typescript
const element = () => multiline() ? 'textarea' : 'input';
createDynamic(element, { value: value() });
```
@description https://docs.solidjs.com/reference/components/dynamic

## API Documentation 3

Renders an arbitrary custom or native component and passes the other props
```typescript
<Dynamic component={multiline() ? 'textarea' : 'input'} value={value()} />
```
@description https://docs.solidjs.com/reference/components/dynamic
