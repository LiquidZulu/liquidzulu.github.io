import { regexReplace } from './regexReplace';
import { getSlug } from './getSlug';

export const wikilinkRegex = /\[\[(([^\]\|]+)(\|[^\]]+)?)\]\]/g;

export const procWikilink = (wikilink: string): [string, string] => {
    const proc = wikilink.replaceAll('[', '').replaceAll(']', '').split('|');
    return proc.length >= 2 ? (proc as [string, string]) : [proc[0], proc[0]];
};

export const wikilinksToMdLinks = (md: string): string =>
    regexReplace(md, wikilinkRegex, x =>
        ((y: [string, string]) => `[${y[1]}](./${getSlug(y[0])})`)(
            procWikilink(x)
        )
    );

export const wikilinksToHypertextLinks = (md: string): string =>
    regexReplace(md, wikilinkRegex, x =>
        ((y: [string, string]) => `<a href="./${getSlug(y[0])}">${y[1]}</a>`)(
            procWikilink(x)
        )
    );
