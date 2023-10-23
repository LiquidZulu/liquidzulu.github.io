// note: for some reason spread syntax does not work here, so Object.assign is required

type TNodeValue = { value: string; [key: string]: any };
type NodeNodeMap = (node: TNodeValue) => TNodeValue;
type NodeStringMap = (node: TNodeValue) => string;
import { regexReplace } from './regexReplace';
import { wikilinksToHypertextLinks } from './wikilinks';

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
        nodeReplacer(node, node =>
            regexReplace(node.value, / <- /g, x => ' ← ')
        ),
    node =>
        nodeReplacer(node, node =>
            regexReplace(node.value, / -> /g, x => ' → ')
        ),
    node =>
        nodeReplacer(node, node =>
            regexReplace(node.value, / \|\^ /g, x => ' ↑ ')
        ),
    node =>
        nodeReplacer(node, node =>
            regexReplace(node.value, / \|v /g, x => ' ↓ ')
        ),
    node =>
        nodeReplacer(node, node =>
            regexReplace(node.value, / <-> /g, x => ' ↔ ')
        ),
];

const arrowFns = [leftArrow, rightArrow, upArrow, downArrow, leftRightArrow];

export const unicodeArrows: NodeNodeMap = node => {
    for (let arrowFn of arrowFns) {
        node = arrowFn(node);
    }
    return node;
};

export const fixObsidianDashes: NodeNodeMap = node =>
    Object.assign(node, {
        // replace -- with endash
        value: regexReplace(
            // replace --- with emdash
            regexReplace(
                // normalise text to have only --- and --, not any rendered dashes, which is contributed, I believe, by gfm
                regexReplace(node.value, /—/g, x => '--'),
                /---/g,
                x => '—'
            ),
            /--/g,
            x => '–'
        ),
    });

export const obsidianWikilinks: (files: string[]) => NodeNodeMap =
    files => node =>
        Object.assign(node, {
            type: 'html',
            value: wikilinksToHypertextLinks(node.value, {
                class: 'internal',
                files: files,
                linkPreface: '/brain/note',
            }),
        });
