# Definition

`TRichText` is the internal representation of a rich text atom. If you wish to
have a whole string of text with different formatting at different points you
need to have a `TRichText[]`. A prototypical `TRichText[]` might look like:

```ts
const richText = [
    'Lorem ipsum ',
    { text: 'dolor sit amet', fontStyle: 'italic' },
    '.',
];
```

Which would correspond to "Lorem ipsum _dolor sit amet_." See
[richTextUtils](../util/richtextutils) for utility classes, allowing you to do
things like:

```ts
const richerText = [
    'Here is some normal text. ',
    i('But this is itallic.'),
    'And we can even make text that ',
    g('GLOWS'),
    '.',
];
```
