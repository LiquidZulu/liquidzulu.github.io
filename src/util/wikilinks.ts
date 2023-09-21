import { regexReplace } from './regexReplace';
import { getSlug } from './getSlug';
import { invertLinks } from './invert';
import type { CollectionEntry } from 'astro:content';

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

export const wikilinksToHypertextLinks = (
    md: string,
    opts: {
        class?: string;
        files?: string[];
        linkPreface?: string;
    }
): string =>
    regexReplace(md, wikilinkRegex, x =>
        ((y: [string, string]) =>
            `<a${
                opts.class
                    ? ' class="' +
                      opts.class +
                      (opts.files
                          ? opts.files.some(e => e == y[0])
                              ? ' link-exists'
                              : ' link-doesnt-exist'
                          : '') +
                      '"'
                    : ''
            } ${
                opts.files
                    ? opts.files.some(e => e == y[0])
                        ? 'href="' +
                          (opts.linkPreface ?? '.') +
                          '/' +
                          getSlug(y[0]) +
                          '"'
                        : /*404*/ 'title="This page has not been created yet"'
                    : ''
            } >${y[1]}</a>`)(procWikilink(x))
    );

export const wikilinksToPlaintext = (md: string): string =>
    regexReplace(md, wikilinkRegex, x =>
        ((y: [string, string]) => y[1])(procWikilink(x))
    );

export const computeOutlinks = (
    collection: Array<CollectionEntry<'brain'>>
): { [key: string]: string[] } => {
    let backlinks = {};
    for (let entry of collection) {
        regexReplace(entry.body, wikilinkRegex, x => {
            const link = getSlug(x)
                .replaceAll('[', '')
                .replaceAll(']', '')
                .split('|')[0];

            backlinks[entry.slug] == undefined
                ? (backlinks[entry.slug] = [link])
                : backlinks[entry.slug].push(link);
            return '';
        });
    }
    return backlinks;
};

export const computeBacklinks = (
    collection: Array<CollectionEntry<'brain'>>
): { [key: string]: string[] } => {
    return invertLinks(computeOutlinks(collection));
};
