# Miscellaneous Utilities

## `commaSeparators`

Turns e.g. `1000000` into `1,000,000`.

<!-- prettier-ignore -->
```ts
function commaSeparators(
    num: number | string, 
    separator?: string, 
    divisionSize?: number
): string;
```

## `interleaver`

Used to interleave a value into an array.

<!-- prettier-ignore -->
```ts
function interleaver<T>(
    inserter: (
        accumulator?: T[],
        current?: T,
        index?: number
    ) => T
): (
    accumulator?: T[],
    current?: T,
    index?: number
) => T[];
```

### Example Usage

```ts
// -> [ 'a', 'foo', 'b', 'foo', 'c' ]
['a','b','c'].reduce(interleaver(_) => 'foo', [])
```

## `mkSignal`

Makes sure that anything which might be a signal is a signal.

```ts
function mkSignal<T>(x: SignalValue<T>): Signal<T>;
```
