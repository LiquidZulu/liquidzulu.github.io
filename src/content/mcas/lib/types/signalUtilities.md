# UnwrapSimpleSignal

I do not know when I wrote this or what it is used for---I will leave that as an
exercise to the reader. The definition is:

```ts
export type UnwrapSimpleSignal<T> = T extends SimpleSignal<infer U> ? U : never;
export type UnwrapSimpleSignals<T> = T extends infer A
    ? UnwrapSimpleSignal<A>
    : never;
```
