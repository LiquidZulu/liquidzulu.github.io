import { makeProject } from '@motion-canvas/core';
import { HighlightStyle } from '@codemirror/language';
import { Code, LezerHighlighter } from '@motion-canvas/2d';
import { tags } from '@lezer/highlight';
import { parser } from '@lezer/javascript';

Code.defaultHighlighter = new LezerHighlighter(
    parser,
    HighlightStyle.define([
        { tag: tags.keyword, color: 'hsl(286, 60%, 67%)' },
        { tag: tags.function(tags.variableName), color: 'hsl(207, 82%, 66%)' },
        { tag: tags.number, color: 'hsl(29, 54%, 61%)' },
        { tag: tags.string, color: 'hsl(95, 38%, 62%)' },
    ])
);

import scene from './scene?scene';

export default makeProject({
    scenes: [scene],
});
