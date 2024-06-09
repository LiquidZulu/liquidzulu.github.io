import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import icon from 'astro-icon';
import markdoc from '@astrojs/markdoc';
import remarkWikilink from '@portaljs/remark-wiki-link';
import { visit } from 'unist-util-visit';
import { readdir } from 'node:fs/promises';
import { copyFileSync } from 'node:fs';
import { globSync } from 'glob';
import { join } from 'node:path';
import { regexReplace } from './src/util/regexReplace';
import {
    unicodeArrows,
    fixObsidianDashes,
    obsidianWikilinks,
    paragraphLinks,
    obsidianReplaceEmptyTableRow,
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

// https://astro.build/config
export default defineConfig({
    site: 'https://liquidzulu.github.io',
    integrations: [
        tailwind(),
        prefetch(),
        icon(),
        markdoc(),
        // from WaldemarLehner
        {
            name: 'copy-motion-canvas-deps',
            hooks: {
                'astro:build:generated': ({ dir, logger }) => {
                    // Get files from dist that are hashed
                    const path = join(
                        new URL(import.meta.url).pathname,
                        '..',
                        './animation/dist'
                    );

                    const allPaths = globSync(join(path, '*.js'));
                    /** @type {string[]}  */
                    const dependencies = allPaths.filter(e => {
                        const filename = e.split('/').pop();
                        if (!filename.split('.').reverse()[1].includes('-')) {
                            return false;
                        }
                        const potentialHash = filename
                            .split('.')
                            .reverse()[1]
                            .split('-')[1];
                        if (potentialHash.length != 8) {
                            return false;
                        }
                        // Hash must be hexdec (0-9, A-F)
                        return /^[a-fA-z0-9]+$/.test(potentialHash);
                    });

                    for (const dep of dependencies) {
                        const from = dep;
                        const to = join(
                            dir.pathname,
                            '_astro',
                            dep.split('/').pop()
                        );
                        copyFileSync(from, to);
                        logger.info(`moved dependency from ${from} to ${to}`);
                    }
                },
            },
        },
    ],
    vite: {
        build: {
            assetsInlineLimit: 0,
        },
    },
    markdown: {
        remarkPlugins: [
            // mmmm, curry
            () => (ast, file) => {
                visit(ast, 'text', unicodeArrows);
                if (isObsidian(file)) {
                    visit(ast, 'text', fixObsidianDashes);
                    visit(ast, 'text', obsidianWikilinks(filesProc));
                    visit(
                        ast,
                        'tableRow',
                        obsidianReplaceEmptyTableRow(emptyRow =>
                            Object.assign(emptyRow, {
                                type: 'html',
                                value: `<tr style="box-shadow: inset 0 1px 0 0 #3f3f46; height: 1px;"></tr>`,
                            })
                        )
                    );
                }
            },
        ],
        rehypePlugins: [
            () => (ast, file) => {
                visit(ast, 'element', paragraphLinks);
            },
        ],
    },
});
