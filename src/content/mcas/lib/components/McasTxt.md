# Usage

`McasTxt` is an extension to motion canvas&rsquo; `Txt` with additional
properties, you can either use it directly or alias it like so:

```tsx
// ...

import { McasTxt as Txt } from 'mcas';

export default makeScene2D(function* (view) {
    view.add(
        <Txt glow fontFamily="Oswald">
            GLOWING TEXT
        </Txt>,
    );
});
```

# Additional Properties

## glow

Doing `<McasTxt glow />` is equivalent to
`<Txt shadowBlur={n} shadowColor={c}/>` where `n` is the `fontSize` and `c` is
the `fill`.
