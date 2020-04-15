const path = require(`path`)
module.exports = async ({ actions, graphql }) => {
  const supportQuery = `
  {
  wpgraphql {
    supportQuestions(where: {status: PUBLISH}, first: 100){
      nodes{
        date
        uri
        id
        slug
        title
        content
        featuredImage {
          altText
          caption
          sourceUrl
        }
      }
    }
  }
}
  `

  return new Promise((resolve, reject) => {
    graphql(supportQuery).then(results => {

      if (results.errors) {
        console.log(results.errors)
        reject(results.errors)
      }
      results.data.wpgraphql.supportQuestions.nodes.forEach(question => {
        actions.createPage({
          path: `/support/${question.slug}/`,
          component: path.resolve(`./src/templates/supportQuestion.tsx`),
          context: {
            // blogId: blog.id,
            ...question
          }
        })
        console.log(`Created page: /support/${question.slug}`)
      })
      resolve()
    })

  })
}
