import { defineMarkdocConfig } from '@astrojs/markdoc/config';
import prism from '@astrojs/markdoc/prism';

export default defineMarkdocConfig({
    extends: [prism()],
});
