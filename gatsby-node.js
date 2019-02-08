/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path')
const pageQuery = `
    {
      allEtShopProduct{
        edges{
          node{
            slug
            name
          }
        }
      }
    }
    `
// You can delete this file if you're not using it
exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(pageQuery).then(results => {

      if (results.errors) {
        console.log(results.errors)
        reject(results.errors)
      }
      results.data.allEtShopProduct.edges.forEach(({ node }) => {
        createPage({
          path: `/products/${node.slug}`,
          component: path.resolve(`./src/components/products/productLayout.tsx`),
          context: {
            slug: node.slug,
          },
        })
      })
    })
    resolve()
  })

}