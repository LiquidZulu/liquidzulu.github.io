import { globSync } from 'glob';
import { join, extname } from 'node:path';
import { copyFileSync } from 'node:fs';

// from WaldemarLehner
export const copyMotionCanvasDeps = (path, extensions) => ({
    name: 'copy-motion-canvas-deps',
    hooks: {
        'astro:build:generated': ({ dir, logger }) => {
            const allPaths = globSync(
                join(path, `*.{${['js', ...extensions].join(',')}}`)
            );
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

            console.log(allPaths);
            console.log(dependencies);

            for (const dep of dependencies) {
                const from = dep;
                const to = join(
                    dir.pathname,
                    extname(dep) == '.js' ? '_astro' : '', // images and such should be stored in the root
                    dep.split('/').pop()
                );
                copyFileSync(from, to);
                logger.info(`moved dependency from ${from} to ${to}`);
            }
        },
    },
});
