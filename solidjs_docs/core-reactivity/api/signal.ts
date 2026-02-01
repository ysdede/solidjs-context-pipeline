---
source_repo: solid
source_path: solid\packages\solid\src\reactive\signal.ts
domain: core-reactivity
extracted_at: "2026-02-01T15:19:27.061Z"
primitive: createEffect
---

---
source_repo: solid
source_path: solid\packages\solid\src\reactive\signal.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.061Z"
---

## API Documentation 1

The MIT License (MIT)
Copyright (c) 2017 Adam Haile
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## API Documentation 2

Object storing callbacks for debugging during development

## API Documentation 3

@deprecated use `afterRegisterGraph`

## API Documentation 4

Creates a new non-tracked reactive context that doesn't auto-dispose
@param fn a function in which the reactive state is scoped
@param detachedOwner optional reactive context to bind the root to
@returns the output of `fn`.
@description https://docs.solidjs.com/reference/reactive-utilities/create-root

## API Documentation 5

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
* the Accessor is merely a function that returns the current value and registers each call to the reactive root
* the Setter is a function that allows directly setting or mutating the value:
```typescript
const [count, setCount] = createSignal(0);
setCount(count => count + 1);
```
@description https://docs.solidjs.com/reference/basic-reactivity/create-signal

## API Documentation 6

Creates a reactive computation that runs immediately before render, mainly used to write to other reactive primitives
```typescript
export function createComputed<Next, Init = Next>(
fn: (v: Init | Next) => Next,
value?: Init,
options?: { name?: string }
): void;
```
@param fn a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param value an optional initial value for the computation; if set, fn will never receive undefined as first argument
@param options allows to set a name in dev mode for debugging purposes
@description https://docs.solidjs.com/reference/secondary-primitives/create-computed

## API Documentation 7

Creates a reactive computation that runs during the render phase as DOM elements are created and updated but not necessarily connected
```typescript
export function createRenderEffect<T>(
fn: (v: T) => T,
value?: T,
options?: { name?: string }
): void;
```
@param fn a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param value an optional initial value for the computation; if set, fn will never receive undefined as first argument
@param options allows to set a name in dev mode for debugging purposes
@description https://docs.solidjs.com/reference/secondary-primitives/create-render-effect

## API Documentation 8

Creates a reactive computation that runs after the render phase
```typescript
export function createEffect<T>(
fn: (v: T) => T,
value?: T,
options?: { name?: string }
): void;
```
@param fn a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param value an optional initial value for the computation; if set, fn will never receive undefined as first argument
@param options allows to set a name in dev mode for debugging purposes
@description https://docs.solidjs.com/reference/basic-reactivity/create-effect

## API Documentation 9

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

## API Documentation 10

Creates a readonly derived reactive memoized signal
```typescript
export function createMemo<T>(
fn: (v: T) => T,
value?: T,
options?: { name?: string, equals?: false | ((prev: T, next: T) => boolean) }
): () => T;
```
@param fn a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param value an optional initial value for the computation; if set, fn will never receive undefined as first argument
@param options allows to set a name in dev mode for debugging purposes and use a custom comparison function in equals
@description https://docs.solidjs.com/reference/basic-reactivity/create-memo

## API Documentation 11

Creates a resource that wraps a repeated promise in a reactive pattern:
```typescript
// Without source
const [resource, { mutate, refetch }] = createResource(fetcher, options);
// With source
const [resource, { mutate, refetch }] = createResource(source, fetcher, options);
```
@param source - reactive data function which has its non-nullish and non-false values passed to the fetcher, optional
@param fetcher - function that receives the source (true if source not provided), the last or initial value, and whether the resource is being refetched, and returns a value or a Promise:
```typescript
const fetcher: ResourceFetcher<S, T, R> = (
sourceOutput: S,
info: { value: T | undefined, refetching: R | boolean }
) => T | Promise<T>;
```
@param options - an optional object with the initialValue and the name (for debugging purposes); see {@link ResourceOptions}
@returns ```typescript
[Resource<T>, { mutate: Setter<T>, refetch: () => void }]
```
* Setting an `initialValue` in the options will mean that both the prev() accessor and the resource should never return undefined (if that is wanted, you need to extend the type with undefined)
* `mutate` allows to manually overwrite the resource without calling the fetcher
* `refetch` will re-run the fetcher without changing the source, and if called with a value, that value will be passed to the fetcher via the `refetching` property on the fetcher's second parameter
@description https://docs.solidjs.com/reference/basic-reactivity/create-resource

## API Documentation 12

Creates a reactive computation that only runs and notifies the reactive context when the browser is idle
```typescript
export function createDeferred<T>(
fn: (v: T) => T,
options?: { timeoutMs?: number, name?: string, equals?: false | ((prev: T, next: T) => boolean) }
): () => T);
```
@param fn a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param options allows to set the timeout in milliseconds, use a custom comparison function and set a name in dev mode for debugging purposes
@description https://docs.solidjs.com/reference/secondary-primitives/create-deferred

## API Documentation 13

Creates a conditional signal that only notifies subscribers when entering or exiting their key matching the value
```typescript
export function createSelector<T, U>(
source: () => T
fn: (a: U, b: T) => boolean,
options?: { name?: string }
): (k: U) => boolean;
```
@param source
@param fn a function that receives its previous or the initial value, if set, and returns a new value used to react on a computation
@param options allows to set a name in dev mode for debugging purposes, optional
```typescript
const isSelected = createSelector(selectedId);
<For each={list()}>
{(item) => <li classList={{ active: isSelected(item.id) }}>{item.name}</li>}
</For>
```
This makes the operation O(2) instead of O(n).
@description https://docs.solidjs.com/reference/secondary-primitives/create-selector

## API Documentation 14

Holds changes inside the block before the reactive context is updated
@param fn wraps the reactive updates that should be batched
@returns the return value from `fn`
@description https://docs.solidjs.com/reference/reactive-utilities/batch

## API Documentation 15

Ignores tracking context inside its scope
@param fn the scope that is out of the tracking context
@returns the return value of `fn`
@description https://docs.solidjs.com/reference/reactive-utilities/untrack

## API Documentation 16

@deprecated

## API Documentation 17

Makes dependencies of a computation explicit
```typescript
export function on<S, U>(
deps: Accessor<S> | AccessorArray<S>,
fn: (input: S, prevInput: S | undefined, prevValue: U | undefined) => U,
options?: { defer?: boolean } = {}
): (prevValue: U | undefined) => U;
```
@param deps list of reactive dependencies or a single reactive dependency
@param fn computation on input; the current previous content(s) of input and the previous value are given as arguments and it returns a new value
@param options optional, allows deferred computation until at the end of the next change
@returns an effect function that is passed into createEffect. For example:
```typescript
createEffect(on(a, (v) => console.log(v, b())));
// is equivalent to:
createEffect(() => {
const v = a();
untrack(() => console.log(v, b()));
});
```
@description https://docs.solidjs.com/reference/reactive-utilities/on-util

## API Documentation 18

Runs an effect only after initial render on mount
@param fn an effect that should run only once on mount
@description https://docs.solidjs.com/reference/lifecycle/on-mount

## API Documentation 19

Runs an effect once before the reactive scope is disposed
@param fn an effect that should run only once on cleanup
@returns the same {@link fn} function that was passed in
@description https://docs.solidjs.com/reference/lifecycle/on-cleanup

## API Documentation 20

Runs an effect whenever an error is thrown within the context of the child scopes
@param fn boundary for the error
@param handler an error handler that receives the error
* If the error is thrown again inside the error handler, it will trigger the next available parent handler
@description https://docs.solidjs.com/reference/reactive-utilities/catch-error

## API Documentation 21

```typescript
export function startTransition(fn: () => void) => Promise<void>
```
@description https://docs.solidjs.com/reference/reactive-utilities/start-transition

## API Documentation 22

```typescript
export function useTransition(): [
() => boolean,
(fn: () => void, cb?: () => void) => void
];
```
@returns a tuple; first value is an accessor if the transition is pending and a callback to start the transition
@description https://docs.solidjs.com/reference/reactive-utilities/use-transition

## API Documentation 23

Creates a Context to handle a state scoped for the children of a component
```typescript
interface Context<T> {
id: symbol;
Provider: FlowComponent<{ value: T }>;
defaultValue: T;
}
export function createContext<T>(
defaultValue?: T,
options?: { name?: string }
): Context<T | undefined>;
```
@param defaultValue optional default to inject into context
@param options allows to set a name in dev mode for debugging purposes
@returns The context that contains the Provider Component and that can be used with `useContext`
@description https://docs.solidjs.com/reference/component-apis/create-context

## API Documentation 24

Uses a context to receive a scoped state from a parent's Context.Provider
@param context Context object made by `createContext`
@returns the current or `defaultValue`, if present
@description https://docs.solidjs.com/reference/component-apis/use-context

## API Documentation 25

Resolves child elements to help interact with children
@param fn an accessor for the children
@returns a accessor of the same children, but resolved
@description https://docs.solidjs.com/reference/component-apis/children

## API Documentation 26

@deprecated since version 1.7.0 and will be removed in next major - use catchError instead
onError - run an effect whenever an error is thrown within the context of the child scopes
@param fn an error handler that receives the error
* If the error is thrown again inside the error handler, it will trigger the next available parent handler
@description https://docs.solidjs.com/reference/reactive-utilities/catch-error
