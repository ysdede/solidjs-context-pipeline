---
source_repo: solid
source_path: solid\packages\solid\src\render\component.ts
domain: ssr
extracted_at: "2026-02-01T15:19:27.059Z"
---

---
source_repo: solid
source_path: solid\packages\solid\src\render\component.ts
domain: unknown
extracted_at: "2026-02-01T15:19:27.059Z"
---

## API Documentation 1

A general `Component` has no implicit `children` prop.  If desired, you can
specify one as in `Component<{name: String, children: JSX.Element}>`.

## API Documentation 2

Extend props to forbid the `children` prop.
Use this to prevent accidentally passing `children` to components that
would silently throw them away.

## API Documentation 3

`VoidComponent` forbids the `children` prop.
Use this to prevent accidentally passing `children` to components that
would silently throw them away.

## API Documentation 4

Extend props to allow an optional `children` prop with the usual
type in JSX, `JSX.Element` (which allows elements, arrays, strings, etc.).
Use this for components that you want to accept children.

## API Documentation 5

`ParentComponent` allows an optional `children` prop with the usual
type in JSX, `JSX.Element` (which allows elements, arrays, strings, etc.).
Use this for components that you want to accept children.

## API Documentation 6

Extend props to require a `children` prop with the specified type.
Use this for components where you need a specific child type,
typically a function that receives specific argument types.
Note that all JSX <Elements> are of the type `JSX.Element`.

## API Documentation 7

`FlowComponent` requires a `children` prop with the specified type.
Use this for components where you need a specific child type,
typically a function that receives specific argument types.
Note that all JSX <Elements> are of the type `JSX.Element`.

## API Documentation 8

@deprecated: use `ParentProps` instead

## API Documentation 9

Takes the props of the passed component and returns its type
@example
ComponentProps<typeof Portal> // { mount?: Node; useShadow?: boolean; children: JSX.Element }
ComponentProps<'div'> // JSX.HTMLAttributes<HTMLDivElement>

## API Documentation 10

Type of `props.ref`, for use in `Component` or `props` typing.
@example Component<{ref: Ref<Element>}>
