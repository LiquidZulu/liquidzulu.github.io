import {
    Code,
    LezerHighlighter,
    Rect,
    insert,
    makeScene2D,
    remove,
    word,
} from '@motion-canvas/2d';
import { createRef, createSignal } from '@motion-canvas/core';
import { colors, popin, shake, McasTxt as Txt } from 'mcas/lib';
import { flashAround, flash } from 'mcas/lib/animations/indications';
import { parser } from '@lezer/javascript';
import { sky500 } from 'mcas/lib/constants/colors';

const highlighter = new LezerHighlighter(parser);

export default makeScene2D(function* (view) {
    view.fill(colors.bg);

    const code = createRef<Code>();

    view.add(
        <Code
            highlighter={highlighter}
            ref={code}
            fontFamily="JetBrains Mono, monospace"
            fontSize={70}
            code={'yield* flashAround(ref);'}
        />
    );

    yield* flashAround(code);
    yield* code().code.replace(word(0, 7, 11), 'flash', 1);
    yield* flash(code);
    yield* code().code.insert([0, 22 - 6], ', colors.sky500', 1);
    yield* flash(code, sky500);
    yield* code().code.edit(1)`yield* flash${insert('Around')}(ref${remove(
        ', colors.sky500'
    )});`;
});
