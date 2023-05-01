/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            screens: {
                'kofi-logo': '864px',
                'table-of-contents': '1132px',
            },
        },
    },
    plugins: [require('daisyui')],
};
