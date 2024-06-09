import { defineConfig } from 'vite';
import motionCanvas from '@motion-canvas/vite-plugin';
import { globSync } from 'glob';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        motionCanvas.default({
            project: globSync('./src/*/*.ts').map(e => './' + e),
        }),
        visualizer({
            emitFile: true,
            filename: 'stats-treemap.html',
            template: 'treemap',
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                dir: './dist',
                minifyInternalExports: false,
                entryFileNames: '[name].js',
            },
        },
    },
});
