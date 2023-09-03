import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

import prefetch from '@astrojs/prefetch';

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
//import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
    site: 'https://liquidzulu.github.io',
    integrations: [
        tailwind(),
        prefetch(),
        //compress()
    ],
});
