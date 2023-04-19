import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import prefetch from "@astrojs/prefetch";

// https://astro.build/config

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), prefetch()]
});