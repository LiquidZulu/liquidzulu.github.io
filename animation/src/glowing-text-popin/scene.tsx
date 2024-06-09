import { makeScene2D } from '@motion-canvas/2d';
import { createRef, waitFor } from '@motion-canvas/core';

import { colors, McasTxt as Txt, popin, popout } from 'mcas/lib';

export default makeScene2D(function* (view) {
    view.fill(colors.bg);

    const glowingText = createRef<Txt>();
    view.add(
        <Txt
            glow
            fontSize={140}
            fontFamily="Oswald"
            fill="red"
            ref={glowingText}>
            HELLO WORLD
        </Txt>
    );

    yield* popin(glowingText);
    yield* waitFor(5);
    yield* popout(glowingText);
});
