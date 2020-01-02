const path = require("path")
const GET_PAGES = `
  query GET_WC_PAGES{
      allWcProduct{
        edges{
          node{
            slug
            name
          }
        }
      }
    }
  `
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions
  const allPages = []
  const fetchPages = async () =>
    await graphql(GET_PAGES).then(({ data }) => {
      const {
        allWcProduct: {
          edges
        }
      } = data
      edges.map(page => {
        allPages.push(page.node)
      })
      return allPages
    })

  await fetchPages().then(allPages => {
    allPages.map(page => {
      console.log(`create page: ${page.slug}`)
      createPage({
        path: `/products/${page.slug}`,
        component: path.resolve(`./src/templates/productPage.tsx`),
        context: {
          slug: page.slug
        }
      })
    })
  })

  // return new Promise((resolve, reject) => {
  //   graphql(pageQuery).then(results => {
  //
  //     if (results.errors) {
  //       console.log(results.errors)
  //       reject(results.errors)
  //     }
  //     results.data.allWcProduct.edges.forEach(({ node }) => {
  //       createPage({
  //         path: `/products/${node.slug}`,
  //         component: path.resolve(`./src/components/products/productDetailPage.tsx`),
  //         context: {
  //           slug: node.slug
  //         }
  //       })
  //       console.log(`Created page: /products/${node.slug}`)
  //     })
  //   })
  //   resolve()
  // })
}
