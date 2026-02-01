---
source_repo: solid
source_path: solid\packages\solid\src\render\flow.ts
domain: ssr
extracted_at: "2026-02-01T15:19:27.058Z"
---

---
source_repo: solid
source_path: solid\packages\solid\src\render\flow.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.058Z"
---

## API Documentation 1

Creates a list elements from a list
it receives a map function as its child that receives a list element and an accessor with the index and returns a JSX-Element; if the list is empty, an optional fallback is returned:
```typescript
<For each={items} fallback={<div>No items</div>}>
{(item, index) => <div data-index={index()}>{item}</div>}
</For>
```
If you have a list with fixed indices and changing values, consider using `<Index>` instead.
@description https://docs.solidjs.com/reference/components/for

## API Documentation 2

Non-keyed iteration over a list creating elements from its items
To be used if you have a list with fixed indices, but changing values.
```typescript
<Index each={items} fallback={<div>No items</div>}>
{(item, index) => <div data-index={index}>{item()}</div>}
</Index>
```
If you have a list with changing indices, better use `<For>`.
@description https://docs.solidjs.com/reference/components/index-component

## API Documentation 3

Conditionally render its children or an optional fallback component
@description https://docs.solidjs.com/reference/components/show

## API Documentation 4

Switches between content based on mutually exclusive conditions
```typescript
<Switch fallback={<FourOhFour />}>
<Match when={state.route === 'home'}>
<Home />
</Match>
<Match when={state.route === 'settings'}>
<Settings />
</Match>
</Switch>
```
@description https://docs.solidjs.com/reference/components/switch-and-match

## API Documentation 5

Selects a content based on condition when inside a `<Switch>` control flow
```typescript
<Match when={condition()}>
<Content/>
</Match>
```
@description https://docs.solidjs.com/reference/components/switch-and-match

## API Documentation 6

Catches uncaught errors inside components and renders a fallback content
Also supports a callback form that passes the error and a reset function:
```typescript
<ErrorBoundary fallback={
(err, reset) => <div onClick={reset}>Error: {err.toString()}</div>
}>
<MyComp />
</ErrorBoundary>
```
Errors thrown from the fallback can be caught by a parent ErrorBoundary
@description https://docs.solidjs.com/reference/components/error-boundary
