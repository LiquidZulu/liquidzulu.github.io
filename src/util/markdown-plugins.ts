// note: for some reason spread syntax does not work here, so Object.assign is required

type TNodeValue = { value: string; [key: string]: any };
type NodeNodeMap = (node: TNodeValue) => TNodeValue;
type NodeStringMap = (node: TNodeValue) => string;
import { regexReplace } from './regexReplace';

const nodeReplacer: (
    node: TNodeValue,
    replacer: NodeStringMap
) => TNodeValue = (node, replacer) =>
    Object.assign(node, {
        value: replacer(node),
    });

export const [
    leftArrow,
    rightArrow,
    upArrow,
    downArrow,
    leftRightArrow,
]: Array<NodeNodeMap> = [
    node =>
        nodeReplacer(node, node => regexReplace(node.value, /<-/g, x => '←')),
    node =>
        nodeReplacer(node, node => regexReplace(node.value, /->/g, x => '→')),
    node =>
        nodeReplacer(node, node => regexReplace(node.value, /\|\^/g, x => '↑')),
    node =>
        nodeReplacer(node, node => regexReplace(node.value, /\|v/g, x => '↓')),
    node =>
        nodeReplacer(node, node => regexReplace(node.value, /<->/g, x => '↔')),
];

const arrowFns = [leftArrow, rightArrow, upArrow, downArrow, leftRightArrow];

export const unicodeArrows: NodeNodeMap = node => {
    for (let arrowFn of arrowFns) {
        node = arrowFn(node);
    }
    return node;
};
