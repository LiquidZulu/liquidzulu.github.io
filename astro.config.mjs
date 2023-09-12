import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import remarkWikilink from '@portaljs/remark-wiki-link';
import { visit } from 'unist-util-visit';
import slugify from 'slugify';
import { readdir } from 'node:fs/promises';
import { regexReplace } from './src/util/regexReplace';

const files = await readdir('./src/content/brain');
const filesProc = files
    .filter(file => !file.startsWith('.'))
    .map(file => file.split('.')[0]);

export default defineConfig({
    experimental: {
        viewTransitions: true,
    },
    site: 'https://liquidzulu.github.io',
    integrations: [tailwind(), prefetch()],
    markdown: {
        // .four-oh-four
        remarkPlugins: [
            remarkWikilink,
            () => ast => {
                // wouldn't this look so much nicer if js had some sort of piping syntax?
                visit(ast, 'text', node =>
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
                    })
                );

                visit(ast, 'wikiLink', node =>
                    Object.assign(node, {
                        data: Object.assign(node.data, {
                            hProperties: Object.assign(node.data.hProperties, {
                                href: filesProc.some(e => e == node.data.target)
                                    ? '/brain/note/' +
                                      slugify(
                                          node.data.hProperties.href
                                      ).toLowerCase()
                                    : '',
                                className: filesProc.some(
                                    e => e == node.data.target
                                )
                                    ? node.data.hProperties.className +
                                      ' link-exists'
                                    : node.data.hProperties.className +
                                      ' link-doesnt-exist',
                            }),
                        }),
                    })
                );
            },
        ],
    },
});
