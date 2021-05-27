require(`dotenv`).config({
    path: `.env.${process.env.NODE_ENV}`,
})

const shouldAnalyseBundle = process.env.ANALYSE_BUNDLE
const conf = {
    env: {
        PROJECT_CARD__HUE_SHIFT_INITIAL: 150,
        PROJECT_CARD__HUE_SHIFT_SUBSEQUENT: 45,
    },
    title: `LiquidZulu`,
    subtitle: `Creating Anarcho-Capitalist Content`,
    url: `https://liquidzulu.github.io`,
    description: `aaaa`,
    language: `en`,
    banner: `/banner.jpg`,
    author: `LiquidZulu`,
    logo: {
        favicon: `/favicon.ico`,
        png: `/logo.png`,
        svg: `/logo.svg`,
    },
    theme: {
        color: {
            bg: `#141821`,
            theme: `#f6ad55`,
        },
    },
    projects: [
        {
            slug: `youtube-scripts`,
            title: `Articles`,
            description: `This is my repository for writing projects, that I then turn into YouTube videos on my channel.`,
        },
        {
            slug: `org-css`,
            title: `org-css`,
            description: `This is my take on an ox-html stylesheet, mimicing the doom-one theme.`,
        },
        {
            slug: `notes`,
            title: `Miscellaneous Notes`,
            description: `This is where I keep all of my assorted note-keeping.`,
        },
        {
            slug: `.doom.d`,
            title: `.doom.d`,
            description: `My Doom Emacs config, managed in orgmode`,
        },
    ],
}

module.exports = {
    siteMetadata: {
        siteTitle: conf.title,
        siteTitleAlt: `${conf.title} | ${conf.subtitle}`,
        siteHeadline: `${conf.title} | ${conf.subtitle}`,
        siteUrl: conf.url,
        siteDescription: conf.description,
        siteLanguage: conf.language,
        siteImage: conf.banner,
        author: conf.author,
        ...conf,
    },
    plugins: [
        {
            resolve: `@lekoarts/gatsby-theme-cara`,
            // See the theme's README for all available options
            options: {},
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `${conf.title} | ${conf.subtitle}`,
                short_name: conf.title,
                description: conf.description,
                start_url: '/',
                background_color: conf.theme.color.bg,
                theme_color: conf.theme.color.theme,
                display: `standalone`,
                icons: [
                    {
                        src: `/android-chrome-192x192.png`,
                        sizes: `192x192`,
                        type: `image/png`,
                    },
                    {
                        src: `/android-chrome-512x512.png`,
                        sizes: `512x512`,
                        type: `image/png`,
                    },
                ],
            },
        },
        `gatsby-plugin-offline`,
        `gatsby-plugin-gatsby-cloud`,
        `gatsby-plugin-netlify`,
        //`@chakra-ui/gatsby-plugin`,
        shouldAnalyseBundle && {
            resolve: `gatsby-plugin-webpack-bundle-analyser-v2`,
            options: {
                analyzerMode: `static`,
                reportFilename: `_bundle.html`,
                openAnalyzer: false,
            },
        },
    ].filter(Boolean),
}
