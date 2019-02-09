const fetch = require('node-fetch')
const queryString = require('query-string')
const fs = require('fs-extra')
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  {
    actions, createNodeId, createContentDigest, store, cache,
  },
  configOptions,
) => {
  const { createNode } = actions

  await fs.removeSync('/.cache');

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes a product to match Gatsby's node structure
  const processProduct = async (product, args) => {

    //  https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-source-filesystem#createremotefilenode
    // download and add image to local file
    await product.images.map(async image => {
      const fileNode = await createRemoteFileNode({
        ...args,
        url: image.fullSize.url,
      })
      image.localFile___NODE = fileNode.id
    })

    const nodeId = createNodeId(`etshop-product-${product.id}`)
    const nodeContent = JSON.stringify(product)

    // Node info
    return Object.assign({}, product, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `EtShopProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(product),
      },
    })
  }

  // const apiOptions = queryString.stringify(configOptions)
  // console.log('apiOptions', apiOptions)

  const dev = process.env.NODE_ENV !== 'production'

  const apiUrl = `http://shopeverytuesday.local/wp-json/et-shop/graphql/products`
  const apiResponse = await fetch(apiUrl)
  const results = await apiResponse.json()

  const jsonResults = JSON.stringify(results.data)
  fs.writeFileSync('src/state/products.json', jsonResults)

  results.data.forEach(async (product) => {
    // Process the product data to match the structure of a Gatsby node
    const productNode = await processProduct(product, { store, cache, createNode, createNodeId })

    // Use Gatsby's createNode helper to create a node from the node data
    createNode(productNode)
  })
}
