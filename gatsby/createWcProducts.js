const path = require("path")
const GET_PAGES = `
  query GET_WC_PAGES{
      allWcProduct(filter: {product_licenses: {elemMatch: {type: {name: {eq: "Standard"}}}}}) {
        edges {
          node {
            name
            slug
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
}
