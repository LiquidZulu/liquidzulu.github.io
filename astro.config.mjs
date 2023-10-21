import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import remarkWikilink from '@portaljs/remark-wiki-link';
import { visit } from 'unist-util-visit';
import { readdir } from 'node:fs/promises';
import { regexReplace } from './src/util/regexReplace';
import {
    unicodeArrows,
    fixObsidianDashes,
    obsidianWikilinks,
} from './src/util/markdown-plugins';
import {
    wikilinksToHypertextLinks,
    wikilinksToMdLinks,
} from './src/util/wikilinks';
import { getSlug } from './src/util/getSlug';

const files = await readdir('./src/content/brain');
const filesProc = files
    .filter(file => !file.startsWith('.'))
    .map(file => getSlug(file.split('.')[0]));

const isObsidian = file => file.path.match(/content\/brain/g) !== null; // | check_for_some_other_vault

export default defineConfig({
    experimental: {
        viewTransitions: true,
    },
    site: 'https://liquidzulu.github.io',
    integrations: [tailwind(), prefetch()],
    markdown: {
        remarkPlugins: [
            // mmmm, curry
            () => (ast, file) => {
                visit(ast, 'text', unicodeArrows);

                if (isObsidian(file)) {
                    visit(ast, 'text', fixObsidianDashes);
                    visit(ast, 'text', obsidianWikilinks(filesProc));
                }
            },
        ],
    },
});
