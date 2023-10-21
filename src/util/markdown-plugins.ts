// note: for some reason spread syntax does not work here, so Object.assign is required

import { regexReplace } from './regexReplace';

type TNodeValue = { value: string; [key: string]: any };

export const [leftArrow, rightArrow, upArrow, downArrow, leftRightArrow]: Array<
    (node: TNodeValue) => TNodeValue
> = [
    node =>
        Object.assign(node, {
            value: regexReplace(node.value, /<-/g, x => '←'),
        }),
    node =>
        Object.assign(node, {
            value: regexReplace(node.value, /->/g, x => '→'),
        }),
    node =>
        Object.assign(node, {
            value: regexReplace(node.value, /\|\^/g, x => '↑'),
        }),
    node =>
        Object.assign(node, {
            value: regexReplace(node.value, /\|v/g, x => '↓'),
        }),
    node =>
        Object.assign(node, {
            value: regexReplace(node.value, /<->/g, x => '↔'),
        }),
];

const arrowFns = [leftArrow, rightArrow, upArrow, downArrow, leftRightArrow];

export const unicodeArrows = (node: TNodeValue) => {
    for (let arrowFn of arrowFns) {
        node = arrowFn(node);
    }
    return node;
};
