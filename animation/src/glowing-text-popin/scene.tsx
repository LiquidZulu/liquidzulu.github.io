import { Circle, Rect, makeScene2D } from '@motion-canvas/2d';
import {
    Reference,
    ThreadGenerator,
    all,
    createRef,
    createRefArray,
} from '@motion-canvas/core';
import {
    colors,
    fadein,
    fadeinleft,
    fadeinright,
    fadeinup,
    fadeout,
    fadeoutleft,
    fadeoutright,
    fadeoutup,
    popin,
    popout,
    McasTxt as Txt,
} from 'mcas/lib';

export default makeScene2D(function* (view) {
    view.fill(colors.bg);

    const anims: [string, (x: Reference<Circle>) => ThreadGenerator][] = [
        ['popin', x => popin(x)],
        ['popout', x => popout(x)],
        ['fadein', x => fadein(x)],
        ['fadeout', x => fadeout(x)],
        ['fadeinleft', x => fadeinleft(x)],
        ['fadeoutleft', x => fadeoutleft(x)],
        ['fadeinright', x => fadeinright(x)],
        ['fadeoutright', x => fadeoutright(x)],
        ['fadeinup', x => fadeinup(x)],
        ['fadeoutup', x => fadeoutup(x)],
    ];

    const rect = createRef<Rect>();
    const circles = createRefArray<Circle>();

    view.add(
        <Rect
            gap={32}
            ref={rect}
            layout
            width="90%"
            wrap="wrap"
            justifyContent="space-evenly"
        />
    );

    for (let [name, _] of anims) {
        rect().add(
            <Rect layout direction="column" gap={64} alignItems="center">
                <Txt fontFamily="mononoki" text={name} />
                <Rect size={300}>
                    <Circle
                        layout={false}
                        ref={circles}
                        fill="red"
                        size={200}
                    />
                </Rect>
            </Rect>
        );
    }

    yield* all(...anims.map(([_, thread], i) => thread(() => circles[i])));
});
