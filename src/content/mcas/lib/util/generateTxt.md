# Usage

## `generateTxt`

`generateTxt` takes a richtext array and transforms it into a `Txt`. For
instance, one can do:

```tsx
generateTxt([
    'Here is some normal text. ',
    i('But this is itallic.'),
    'And we can even make text that ',
    g('GLOWS'),
    '.',
]);
```

See `richTextUtils.org` for information on the formatting.
