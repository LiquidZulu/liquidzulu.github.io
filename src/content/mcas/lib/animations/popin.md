# `popin` / `popout`

`popin` is a spring from a `scale` of `0` up to `1`. Use it like:

```tsx
const ref = createRef<Rect>();
view.add(<Rect width={500} height={500} />);

// make sure the scale is 0 initially, if there are other animations before it
ref().scale(0);
yield * popin(ref);
```

If you are using `createRefArray` then you will need to wrap the ref in a
function:

```tsx
yield * popin(() => ref[0]);
```

`popout` is the opposite of `popin`.

# `popinSize` / `popoutSize`

The same as [`popin` / `popout`](#org28354b0) but using the `size` instead of
the `scale`.
