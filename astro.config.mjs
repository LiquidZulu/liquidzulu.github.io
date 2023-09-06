import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import prefetch from '@astrojs/prefetch';
import remarkWikilink from '@portaljs/remark-wiki-link';
import { visit } from 'unist-util-visit';
import slugify from 'slugify';
import { readdir } from 'node:fs/promises';

const files = await readdir('./src/content/brain');
const filesProc = files
    .filter(file => !file.startsWith('.'))
    .map(file => file.split('.')[0]);

export default defineConfig({
    site: 'https://liquidzulu.github.io',
    integrations: [tailwind(), prefetch()],
    markdown: {
        // .four-oh-four
        remarkPlugins: [
            remarkWikilink,
            () => ast => {
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
