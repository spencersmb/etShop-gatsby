require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

module.exports = {
  siteMetadata: {
    title: `${process.env.GATSBY_TITLE}`,
    description: `${process.env.GATSBY_DESCRIPTION}`,
    author: `@Teelac`,
    authorUrl: "https://every-tuesday.com/about/#teela",
    siteUrl: `${process.env.GATSBY_DB}`,
    siteName: `Every-Tuesday Shop`
  },
  plugins: [
    `gatsby-plugin-typescript`,
    {
      resolve: `gatsby-plugin-stripe`,
      options: {
        async: true
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        // Add any options here
        displayName: true
      }
    },
    {
      resolve: "gatsby-plugin-module-resolver",
      options: {
        root: "./src", // <- will be used as a root dir
        aliases: {
          "@api": "./api",
          "@components": "./components", // <- will become ./src/components
          "@et/types": "./types",
          "@redux": "./state",
          "@svg": "./assets/svg",
          "@styles": "./styles",
          "@utils": "./utils",
          // helpers: './helpers', // <- will become ./src/helpers
          static: {
            root: "./public", // <- will used as this alias' root dir
            alias: "./static" // <- will become ./public/static
          }
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/assets/images/gatsby-icon.png` // This path is relative to the root of the site.
      }
    },
    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Fira Sans`,
            subsets: [`latin`],
            variants: [`400`, `500`, `600`, `700`]
          }
        ],
        formats: [
          "woff",
          "woff2"
        ]
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /svg-icons/
        }
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-source-etshop`,
    // `gatsby-source-test`,
    `gatsby-plugin-playground`,
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // "gatsby-plugin-offline",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: process.env.GATSBY_DB,
        sitemap: `${process.env.GATSBY_DB}/sitemap.xml`
        // policy: [{ userAgent: '*', allow: '/' }]
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        serialize: ({ site, allSitePage }) => {
          return allSitePage.edges
            .sort((a, b) => {
              // Default to 0, which indicates
              // no sorting is necessary
              let returnVal = 0

              // If `a` is a Chevy, subtract 1
              // to move `a` "up" in the sort order
              // because Chevys are awesome.
              if (a.node.path === "/") {
                returnVal = returnVal - 1
              }

              if (b.node.path === "/") {
                returnVal = returnVal + 1
              }

              // If `b` is a Chevy, add 1
              // to move `b` "up" in the sort order
              // if (b.match(/Chevy/)) {
              //   returnVal = returnVal + 1;
              // }

              return returnVal
            })
            .map(edge => {

              const urlPath = edge.node.path
              // console.log('urlPath', urlPath)
              const productsRegex = /(\/products\/)/

              if (urlPath === "/") {
                return {
                  url: site.siteMetadata.siteUrl + edge.node.path,
                  changefreq: `daily`,
                  priority: 1
                }
              } else if (urlPath.match(productsRegex)) {
                return {
                  url: site.siteMetadata.siteUrl + edge.node.path,
                  changefreq: `weekly`,
                  priority: 0.7
                }
              } else {
                return {
                  url: site.siteMetadata.siteUrl + edge.node.path,
                  changefreq: `monthly`,
                  priority: 0.5
                }
              }
            })

        }
      }
    },
    // make sure to put last in the array
    {
      resolve: `gatsby-plugin-netlify`,
      options: {
        headers: {
          "/*": [
            `Referrer-Policy: no-referrer-when-downgrade`,
            `Access-Control-Allow-Origin: *`,
            `Expect-CT: enforce,max-age=604800`
          ]
        }, // option to add more headers. `Link` headers are transformed by the below criteria
        allPageHeaders: [
          // `Link: </icons/icon-48x48.png>; rel=preload; as=image`
        ],// option to add headers for all pages. `Link` headers are transformed by the below criteria
        mergeSecurityHeaders: true,// boolean to turn off the default security headers
        mergeLinkHeaders: false,// boolean to turn off the default gatsby js headers (disabled by default, until gzip is fixed for server push)
        mergeCachingHeaders: true// boolean to turn off the default caching headers
        // transformHeaders: (headers, path) => headers, // optional transform for manipulating headers under each path (e.g.sorting), etc.
      }
    }
  ]
}
