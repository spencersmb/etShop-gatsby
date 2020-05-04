const path = require("path")

module.exports = async ({ actions, graphql }) => {
  const { createPage } = actions
  const perPage = 10
  const allCats = {}
  const excludeItems = ["uncategorized"]
  let pageNumber = 1

  const fetchCatPages = async (variables) =>
    await graphql(GET_CATS, variables).then(async ({ data }) => {
      const {
        wpgraphql: {
          categories: {
            nodes
          }
        }
      } = data

      await Promise.all(nodes
        .filter(node => !excludeItems.includes(node.slug))
        .map((cat) => {
          const {
            supportQuestions: {
              pageInfo: { hasNextPage, endCursor, hasPreviousPage }
            }
          } = cat
          const questions = cat.supportQuestions.nodes
          const catPageTemplate = path.resolve(`./src/templates/supportCatListPage.tsx`)
          const catPagePath = `/support/category/${cat.slug}/page/${pageNumber}`
          // console.log("cat.supportQuestions.pageInfo", cat.supportQuestions.pageInfo)
          // console.log("slug", cat.slug)
          // console.log("ID", cat.id)
          // console.log("pageNumber", pageNumber)
          // console.log("hasNextPage", hasNextPage)
          // console.log("hasPrevPage", hasPreviousPage)

          // add item to be excluded if no next page
          if (!hasNextPage) {
            excludeItems.push(cat.slug)
          }
          const prevPages = allCats[cat.slug] && allCats[cat.slug].pages ? allCats[cat.slug].pages : {}
          // check if object exists first
          allCats[cat.slug] = {
            pages: {
              ...prevPages,
              [pageNumber]: {
                path: catPagePath,
                component: catPageTemplate,
                context: {
                  cat: cat.name,
                  catId: cat.id,
                  questions,
                  pageNumber,
                  hasNextPage,
                  hasPrevPage: hasPreviousPage
                }
              }
            }
          }

          if (hasNextPage) {
            pageNumber++
            return fetchCatPages({ first: perPage, after: endCursor })
          }
        }))
      return allCats
    })

  await fetchCatPages({ first: perPage, after: null }).then(catItems => {
    Object.keys(catItems).map((cat) => {
      const pages = Object.keys(catItems[cat].pages)
      pages.map(page => {
        console.log(`create Cat Page ${cat}`)
        console.log(`create Cat PageNumber ${catItems[cat].pages[page].context.pageNumber}`)
        createPage(catItems[cat].pages[page])
      })
    })
  })
}

const GET_CATS = `
  query GET_ALL_CATS($first:Int $after:String){
      wpgraphql{
        categories {
          nodes {
            id
            name
            slug
            supportQuestions(after: $after, first: $first) {
              pageInfo{
                  hasNextPage
                  hasPreviousPage
                  endCursor
              }
              nodes {
                  title
                  id
                  slug
                  excerpt
                  acfSupportQuestions{
                      popularity
                  }
              }
            }
          }
        }
      }
    }
  `
