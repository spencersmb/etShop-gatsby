/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)
const createWcProducts = require(`./gatsby/createWcProducts`)
const createSupportPages = require(`./gatsby/createSupportPages`)
const createCatPages = require(`./gatsby/createCatsPages`)

exports.createPages = async ({ graphql, actions }) => {

  // await createSupportPages({ actions, graphql })
  await createWcProducts({ actions, graphql })
  // await createCatPages({ actions, graphql })

}

exports.createResolvers = ({
                             actions,
                             cache,
                             createNodeId,
                             createResolvers,
                             store,
                             reporter
                           }) => {
  const { createNode } = actions

  createResolvers({
    WPGraphQL_SupportQuestion: {
      createdAt: {
        type: `String`,
        resolve (source, args, context, info) {
          return "date manual"
        }
      }
    },
    // allWcProduct_MediaItem: {
    //   imageFile: {
    //     type: `File`,
    //     resolve (source, args, context, info) {
    //       console.log("wcProduct media item", source.sourceUrl)
    //
    //       return createRemoteFileNode({
    //         url: source.sourceUrl,
    //         store,
    //         cache,
    //         createNode,
    //         createNodeId,
    //         reporter
    //       })
    //     }
    //   }
    // },
    WPGraphQL_MediaItem: {
      imageFile: {
        type: `File`,
        resolve (source, args, context, info) {
          console.log("created file", source.sourceUrl)

          return createRemoteFileNode({
            url: source.sourceUrl,
            store,
            cache,
            createNode,
            createNodeId,
            reporter
          })
        }
      }
    }
  })
}

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/account/)) {
    page.matchPath = `/account/*`

    // Update the page.
    createPage(page)
  }
}
