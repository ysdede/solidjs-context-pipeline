---
source_repo: signals
source_path: signals\src\signals.ts
domain: core-reactivity
extracted_at: "2026-02-01T15:19:27.038Z"
primitive: createEffect
---

---
source_repo: signals
source_path: signals\src\signals.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.038Z"
---

## API Documentation 1

Creates a simple reactive state with a getter and setter
```typescript
const [state: Accessor<T>, setState: Setter<T>] = createSignal<T>(
value: T,
options?: { name?: string, equals?: false | ((prev: T, next: T) => boolean) }
)
```
@param value initial value of the state; if empty, the state's type will automatically extended with undefined; otherwise you need to extend the type manually if you want setting to undefined not be an error
@param options optional object with a name for debugging purposes and equals, a comparator function for the previous and next value to allow fine-grained control over the reactivity
@returns ```typescript
[state: Accessor<T>, setState: Setter<T>]
```
* the Accessor is a function that returns the current value and registers each call to the reactive root
* the Setter is a function that allows directly setting or mutating the value:
```typescript
const [count, setCount] = createSignal(0);
setCount(count => count + 1);
```
@description https://docs.solidjs.com/reference/basic-reactivity/create-signal

## API Documentation 2

Creates a readonly derived reactive memoized signal
```typescript
export function createMemo<T>(
compute: (v: T) => T,
value?: T,
options?: { name?: string, equals?: false | ((prev: T, next: T) => boolean) }
): () => T;
```
@param compute a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param value an optional initial value for the computation; if set, fn will never receive undefined as first argument
@param options allows to set a name in dev mode for debugging purposes and use a custom comparison function in equals
@description https://docs.solidjs.com/reference/basic-reactivity/create-memo

## API Documentation 3

Creates a reactive effect that runs after the render phase
```typescript
export function createEffect<T>(
compute: (prev: T) => T,
effect: (v: T, prev: T) => (() => void) | void,
value?: T,
options?: { name?: string }
): void;
```
@param compute a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param effect a function that receives the new value and is used to perform side effects, return a cleanup function to run on disposal
@param error an optional function that receives an error if thrown during the computation
@param value an optional initial value for the computation; if set, fn will never receive undefined as first argument
@param options allows to set a name in dev mode for debugging purposes
@description https://docs.solidjs.com/reference/basic-reactivity/create-effect

## API Documentation 4

Creates a reactive computation that runs during the render phase as DOM elements are created and updated but not necessarily connected
```typescript
export function createRenderEffect<T>(
compute: (prev: T) => T,
effect: (v: T, prev: T) => (() => void) | void,
value?: T,
options?: { name?: string }
): void;
```
@param compute a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param effect a function that receives the new value and is used to perform side effects
@param value an optional initial value for the computation; if set, fn will never receive undefined as first argument
@param options allows to set a name in dev mode for debugging purposes
@description https://docs.solidjs.com/reference/secondary-primitives/create-render-effect

## API Documentation 5

Creates a tracked reactive effect that only tracks dependencies inside the effect itself
```typescript
export function createTrackedEffect(
compute: () => (() => void) | void,
options?: { name?: string, defer?: boolean }
): void;
```
@param compute a function that contains reactive reads to track and returns an optional cleanup function to run on disposal or before next execution
@param options allows to set a name in dev mode for debugging purposes
@description https://docs.solidjs.com/reference/secondary-primitives/create-tracked-effect

## API Documentation 6

Creates a reactive computation that runs after the render phase with flexible tracking
```typescript
export function createReaction(
onInvalidate: () => void,
options?: { name?: string }
): (fn: () => void) => void;
```
@param invalidated a function that is called when tracked function is invalidated.
@param options allows to set a name in dev mode for debugging purposes
@description https://docs.solidjs.com/reference/secondary-primitives/create-reaction

## API Documentation 7

Returns a promise of the resolved value of a reactive expression
@param fn a reactive expression to resolve
