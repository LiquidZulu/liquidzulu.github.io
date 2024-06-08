import { makeScene2D, Rect, Ray, Img, Code, lines } from '@motion-canvas/2d';
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
} from '@motion-canvas/core';
import { colors, McasTxt as Txt, popin, popout } from 'mcas';
import cursor from './assets/cursor.png';

export default makeScene2D(function* (view) {
    view.fill(colors.bg);

    const nFrameBlocks = 12;
    const frameBlockGap = 6;
    const frameBlockWidth = 50;

    const timeline = () => (
        <Rect
            direction="column"
            width="100%"
            alignItems="center"
            justifyContent="center"
            fill="black"
            height={160}
            gap={8}>
            <Rect gap={frameBlockWidth * 2 + frameBlockGap - 48}>
                {new Array(Math.floor(nFrameBlocks / 2)).fill(0).map((_, i) => (
                    <Txt
                        fontFamily="mononoki"
                        textAlign="center"
                        width={54}
                        marginTop={12}
                        marginBottom={-4}
                        fill="white">{`${i * 10}`}</Txt>
                ))}
            </Rect>
            <Rect gap={frameBlockGap} height={100} width="100%" fill="#121212">
                {new Array(nFrameBlocks).fill(0).map(_ => (
                    <Rect
                        width={frameBlockWidth}
                        height="100%"
                        fill="#242424"
                    />
                ))}
            </Rect>
        </Rect>
    );

    const eventDuration = createSignal(1);
    const code = createRef<Code>();

    view.add(
        <Rect gap={120} alignItems="center" layout>
            <Rect fill="#020617" padding={24}>
                <Code
                    ref={code}
                    fontSize={42}
                    fontFamily="mononoki"
                    code={createSignal(
                        () =>
                            `const redDuration = 2;\nconst yellowDuration = ${eventDuration().toFixed(
                                2
                            )};\nconst blueDuration = 1;\n\nyield* red();\nyield* yellow();\nyield* blue();`
                    )}
                />
            </Rect>
            <Rect
                width={
                    frameBlockWidth * nFrameBlocks +
                    (nFrameBlocks - 1) * frameBlockGap
                }
                gap={48}
                direction="column">
                <Rect width="100%" gap={6} direction="column">
                    <Txt.b fill="#A0A0A0">DECLARATIVE</Txt.b>
                    {timeline()}
                </Rect>
                <Rect width="100%" gap={6} direction="column">
                    <Txt.b fill="#A0A0A0">IMPERATIVE</Txt.b>
                    {timeline()}
                </Rect>
            </Rect>
        </Rect>
    );

    code().selection(lines(1));

    const frame = (pos: SignalValue<number>, color: PossibleColor) => (
        <Rect
            y={-67}
            x={createSignal(
                () => (frameBlockWidth + frameBlockGap) * pos() + 415
            )}
            width={40}
            height={40}
            radius={10}
            rotation={45}
            fill={color}
        />
    );

    const middleFrame = createSignal(-1);

    view.add(frame(() => -4, '#FF646F'));
    view.add(frame(middleFrame, '#FEC56E'));
    view.add(frame(() => 3, '#68AADE'));
    view.add(
        <Img
            src={cursor}
            width={62}
            x={createSignal(
                () =>
                    (frameBlockWidth + frameBlockGap) * middleFrame() + 12 + 415
            )}
            y={-30}
        />
    );

    view.add(
        <Rect
            y={205}
            x={-200 + 415}
            height={18}
            radius={9}
            width={180}
            fill="#FF646F"></Rect>
    );

    view.add(
        <Rect
            y={205}
            x={createSignal(() => -50 + (eventDuration() - 1) * 50 + 415)}
            height={18}
            radius={9}
            width={createSignal(() => 100 * eventDuration())}
            fill="#FEC56E"></Rect>
    );
    view.add(
        <Rect
            y={205}
            x={createSignal(() => -30 + 100 * eventDuration() + 415)}
            height={18}
            radius={9}
            width={120}
            fill="#68AADE"></Rect>
    );

    yield* all(
        middleFrame(1, 2),
        chain(eventDuration(0.8, 1.5), eventDuration(1.2, 1.5))
    );
    yield* all(
        middleFrame(-2, 2),
        chain(eventDuration(1.8, 1.5), eventDuration(1.2, 1.5))
    );
    yield* all(middleFrame(0, 2), eventDuration(0.6, 2));
    yield* all(
        middleFrame(-1, 2),
        chain(eventDuration(1.2, 1.5), eventDuration(1, 1.5))
    );
});
