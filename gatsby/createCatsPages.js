const path = require("path")
const GET_CATS = `
  query GET_ALL_CATS{
      wpgraphql{
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
  `
module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions
  const allCats = []
  const fetchPages = async () =>
    await graphql(GET_CATS).then(({ data }) => {
      const {
        wpgraphql: {
          categories: {
            nodes
          }
        }
      } = data
      nodes.map(cat => {
        if (cat.slug !== "uncategorized") {
          allCats.push(cat)
        }
      })
      return allCats
    })

  await fetchPages().then(allCats => {
    allCats.map(cat => {
      console.log(`create page: /support/topic/${cat.slug}`)
      createPage({
        path: `/support/category/${cat.slug}`,
        component: path.resolve(`./src/templates/supportCatListPage.tsx`),
        context: {
          cat: cat.name
        }
      })
    })
  })
}
