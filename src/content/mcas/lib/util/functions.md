# Functions

This file provides a number of generic functions

## `I`

Identity function:

```ts
export const I = (a: any) => a;
```

## `sinFactory`

`sinFactory` is used for building parameterised sine functions:

<!-- prettier-ignore -->
```ts
function sinFactory(
    high?: number,
    low?: number,
    frequency?: number
): (offset: number) => (x: number) => number;
```

It returns a function that gives a sine function at the given offset. The paramaters all default to 1.
