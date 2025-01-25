import { Rect, makeScene2D } from '@motion-canvas/2d';
import { createRef, createSignal } from '@motion-canvas/core';
import { colors, shake, McasTxt as Txt } from 'mcas/lib';

export default makeScene2D(function* (view) {
    view.fill(colors.bg);

    const rect = createRef<Rect>();

    view.add(<Rect position={[500, 0]} ref={rect} size={500} fill="red" />);

    view.add(
        <Rect
            layout
            direction="column"
            gap={32}
            position={[-350, 0]}
            width={550}>
            <Txt
                fontFamily="mononoki"
                text={createSignal(
                    () =>
                        `position = [${rect().position().x.toFixed(0)}, ${rect()
                            .position()
                            .y.toFixed(0)}]`
                )}
            />
            <Txt
                fontFamily="mononoki"
                text={createSignal(
                    () => `scale = ${rect().scale().x.toFixed(2)}`
                )}
            />
            <Txt
                fontFamily="mononoki"
                text={createSignal(
                    () => `rotation = ${rect().rotation().toFixed(0)}`
                )}
            />
        </Rect>
    );

    yield* shake(v => {
        rect().position([350, -v]);
    }, 5);
    yield* shake(v => {
        rect().scale(1 + v / 100);
    });
    yield* shake(v => {
        rect().rotation(v);
    });
});
