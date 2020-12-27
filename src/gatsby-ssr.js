/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 *
 * All configuration related things are here
 *
 * This is configuration file
 */
require("dotenv").config();


module.exports = {
    siteMetadata: {
        author: `@logemann`,
        siteUrl: `https://okaycloud.de`,
        title: `We deliver high end cloud software solutions`,
        titleSuffix: `okaycloud`,
        image: `/images/og/okaycloud-main-og.png`,
        description: `okaycloud creates your cloud projects. At home in Berlin, germany's startup capital, we help companies ramp up their projects or migrate existing software projects to the cloud. `,
        keywords: `aws, consulting, cloud, okaycloud, architecture, development, berlin`

    },
    /* Your site config here */
    plugins: [
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                icon: 'src/assets/images/favicon.png',
                name: `okaycloud UG`,
                short_name: `okaycloud UG`,
                start_url: `/`,
                background_color: `#f7f0eb`,
                theme_color: `#4FB8A3`,
                display: `standalone`,
            },
        },
        {
            resolve: "gatsby-plugin-google-tagmanager",
            options: {
                id: "GTM-WQ2X46H",

                // Include GTM in development.
                //
                // Defaults to false meaning GTM will only be loaded in production.
                includeInDevelopment: false,

                // datalayer to be set before GTM is loaded
                // should be an object or a function that is executed in the browser
                //
                // Defaults to null
                defaultDataLayer: { platform: "gatsby" },

                // Specify optional GTM environment details.
                //gtmAuth: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_AUTH_STRING",
                //gtmPreview: "YOUR_GOOGLE_TAGMANAGER_ENVIRONMENT_PREVIEW_NAME",
                //dataLayerName: "YOUR_DATA_LAYER_NAME",

                // Name of the event that is triggered
                // on every Gatsby route change.
                //
                // Defaults to gatsby-route-change
                //routeChangeEventName: "ROUTE_CHANGE",
            },
        },
        {
            resolve: `gatsby-plugin-cookiehub-banner`,
            options: {
                // The ID is part of the CookieHub URL: https://cookiehub.net/cc/YOUR_COOKIEHUB_ID.js
                cookieHubId: "7096e979",
                // Optional parameter (default false) - Use new v2 API.
                cookieHubV2Api: true,
                stageHosts: ["localhost", "stage.okaycloud.de"],
                stageMode: "demo", // can be "off" (no banner at all) or "demo" (watermarked demo mode of cookiehub)
                // Categories configured with CookieHub
                categories: [
                    {
                        categoryName: 'analytics', // Unique id of the category which is set by Cookiehub.
                        cookieName: 'gatsby-plugin-google-analytics-gdpr_cookies-enabled' // Your custom cookie name
                    },
                    {
                        categoryName: 'marketing',
                        cookieName: 'marketing-enabled'
                    }
                ]
            }
        },
        /*        {
                    resolve: `gatsby-plugin-favicon`,
                    options: {
                        logo: "./src/assets/images/favicon.png",
                    }
                },*/
        `gatsby-plugin-react-helmet`,
        `gatsby-plugin-sass`,
        `gatsby-plugin-sitemap`,
        `gatsby-plugin-styled-components`,
        {
            resolve: 'gatsby-plugin-html-attributes',
            options: {
                lang: 'de'
            }
        },
        {
            resolve: `gatsby-plugin-react-i18next`,
            options: {
                path: `${__dirname}/locales`,
                languages: [`de`, `en`],
                defaultLanguage: `de`,
                redirect: true,
                siteUrl: 'www.okaycloud.de',

                // you can pass any i18next options
                // pass following options to allow message content as a key
                i18nextOptions: {
                    interpolation: {
                        escapeValue: false // not needed for react as it escapes by default
                    },
                    keySeparator: false,
                    nsSeparator: false
                },
                pages: [
                    {
                        matchPath: '/:lang?/blog/:uid',
                        getLanguageFromPath: true,
                        excludeLanguages: ['es']
                    },
                    {
                        matchPath: '/preview',
                        languages: ['en']
                    }
                ]
            }
        },
        {
            resolve: `gatsby-plugin-google-fonts`,
            options: {
                fonts: [
                    `Nunito\:ital,wght@0,200;0,300;0,400;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,600;1,700;1,800;1,900`,
                ],
                display: 'swap'
            }
        },
        /*        {
                    resolve: `gatsby-plugin-percy`,
                    options: {
                        // example options:
                        // files: [`dir/!*.html`],
                        // ignore: [`ignore/!*.html`],
                        // config: `config/.percy.yaml`,
                    },
                },*/
        /*{
            resolve: `gatsby-plugin-algolia`,
            options: {
                // This plugin must be placed last in your list of plugins to ensure that it can query all the GraphQL data
                resolve: `gatsby-plugin-algolia`,
                options: {
                    appId: process.env.ALGOLIA_APP_ID,
                    apiKey: process.env.ALGOLIA_API_KEY,
                    indexName: process.env.ALGOLIA_INDEX_NAME, // for all queries
                    queries,
                    chunkSize: 10000, // default: 1000
                    settings: {
                        // optional, any index settings
                    },
                    enablePartialUpdates: true, // default: false
                    matchFields: ['slug', 'modified'], // Array<String> default: ['modified']
                    concurrentQueries: false, // default: true
                    skipIndexing: false, // default: false, useful for e.g. preview deploys or local development
                },
            },
        }*/
    ],
}
