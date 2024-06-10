/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            screens: {
                'kofi-logo': '864px',
                'table-of-contents': '1132px',
            },
            dropShadow: {
                glow: '0 0px 65px rgba(255, 255,255, 0.2)',
            },
        },
    },
    plugins: [require('daisyui')],
};
