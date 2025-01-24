import {
    makeScene2D,
    Rect,
    Ray,
    Img,
    Code,
    lines,
    Circle,
    Gradient,
    LezerHighlighter,
    replace,
} from '@motion-canvas/2d';
import {
    all,
    chain,
    waitFor,
    createRef,
    createRefArray,
    createSignal,
    PossibleColor,
    Signal,
    SignalValue,
    loopFor,
    easeInOutBack,
    Color,
    SimpleSignal,
    sequence,
    waitUntil,
    delay,
} from '@motion-canvas/core';
import {
    McasTxt as Txt,
    colors,
    fadein,
    localGradient,
    mkGradient,
    popin,
    popout,
} from 'mcas/lib';
import {
    emerald500,
    fuchsia500,
    indigo500,
    sky500,
} from 'mcas/lib/constants/colors';
import { parser } from '@lezer/javascript';

const highlighter = new LezerHighlighter(parser);

export default makeScene2D(function* (view) {
    view.fill(colors.bg);

    const bg = createRef<Rect>();

    view.add(
        <Rect
            ref={bg}
            size={view.size}
            fill={mkGradient('right', 'yellow', 'red')}
        />
    );

    const circle = createRef<Circle>();
    const title = createRef<Txt>();

    view.add(
        <Txt
            ref={title}
            fill="black"
            fontFamily="oswald"
            fontSize={80}
            position={[0, -400]}>
            LOCAL GRADIENTS FOLLOW THEIR PARENT
        </Txt>
    );
    view.add(<Circle ref={circle} size={320} />);

    circle().fill(localGradient(circle)('right', 'yellow', 'red'));

    yield* circle().scale(2, 2).to(1, 2);
    yield* circle().rotation(360, 1);
    yield* circle()
        .position([300, 200], 1, easeInOutBack)
        .to([-600, 300], 1, easeInOutBack);

    const rays = createRefArray<Ray>();
    const txts = createRefArray<Txt>();

    view.add(
        <Rect
            layout
            direction="column"
            width={1920}
            gap={256}
            position={[0, 50]}>
            <Rect direction="column" gap={64}>
                <Txt opacity={0} ref={txts} marginLeft={18} fontFamily="oswald">
                    MCAS:
                </Txt>
                <Ray
                    end={0}
                    ref={rays}
                    lineWidth={80}
                    fromX={-1920 / 2}
                    toX={1920 / 2}
                    stroke={mkGradient(1920, 'right', emerald500, fuchsia500)}
                />
            </Rect>
            <Rect direction="column" gap={64}>
                <Txt opacity={0} ref={txts} marginLeft={18} fontFamily="oswald">
                    Motion Canvas:
                </Txt>
                <Ray
                    end={0}
                    ref={rays}
                    lineWidth={80}
                    fromX={-1920 / 2}
                    toX={1920 / 2}
                    stroke={
                        new Gradient({
                            fromX: -1920 / 2,
                            toX: 1920 / 2,
                            stops: [
                                {
                                    color: emerald500,
                                    offset: 0,
                                },
                                {
                                    color: fuchsia500,
                                    offset: 1,
                                },
                            ],
                        })
                    }
                />
            </Rect>
        </Rect>
    );

    yield* all(
        popout(circle),
        bg().opacity(0, 1),
        title().text('MCAS GRADIENTS HAVE IMPROVED INTERPOLATION', 1),
        title().fill('white', 1),
        sequence(0.2, ...rays.map(ray => ray.end(1, 1))),
        sequence(0.2, ...txts.map(txt => txt.opacity(1, 1)))
    );
    yield* waitFor(4);

    yield* all(
        title().text('MCAS GRADIENTS ARE CONCISE', 1),
        sequence(0.2, ...rays.map(ray => ray.start(1, 1))),
        sequence(0.2, ...txts.map(txt => txt.opacity(0, 1)))
    );

    const mc = createRef<Code>();
    const mcas = createRef<Code>();

    view.add(
        <Rect layout width={1920} justifyContent="space-evenly">
            <Code
                scale={0}
                ref={mc}
                highlighter={highlighter}
                fontSize={28}
                fontFamily={'JetBrains Mono, monospace'}
                code={`\
const gradient = new Gradient({
    fromX: -1920 / 2,
    toX: 1920 / 2,
    stops: [
        {
            color: emerald500,
            offset: 0,
        },
        {
            color: fuchsia500,
            offset: 1,
        },
    ],
});`}
            />
            <Code
                scale={0}
                ref={mcas}
                highlighter={highlighter}
                fontSize={28}
                fontFamily={'JetBrains Mono, monospace'}
                code={`\
// Multiple APIs!
// direction with width
const gradient = mkGradient(
    1920,
    'right',
    emerald500,
    fuchsia500
);`}
            />
        </Rect>
    );

    yield* sequence(0.2, popin(mc), popin(mcas));
    yield* waitFor(2);
    yield* mcas().code.edit(1)`\
// Multiple APIs!
// ${replace('direction with width', 'implicit width')}
const gradient = mkGradient(
    ${replace(
        `1920,
    'right',
    emerald500,
    fuchsia500`,
        `'right',
    emerald500,
    fuchsia500`
    )}
);`;
    yield* waitFor(2);
    yield* mcas().code.edit(1)`\
// Multiple APIs!
// ${replace('implicit width', 'explicit points')}
const gradient = mkGradient(
    ${replace(
        `'right',
    emerald500,
    fuchsia500`,
        `[-1920 / 2, 0],
    [1920 / 2, 0],
    emerald500,
    fuchsia500`
    )}
);`;
    yield* waitFor(2);
    circle().position(0);
    yield* all(
        sequence(0.2, popout(mc), popout(mcas)),
        bg().opacity(1, 1),
        title().fill('black', 1),
        title().text('LOCAL GRADIENTS FOLLOW THEIR PARENT', 1)
    );
    yield* popin(circle);
});
