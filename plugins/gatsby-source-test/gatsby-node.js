const utils = require("./utils")

const fetch = require("node-fetch")
const queryString = require("query-string")
const fs = require("fs-extra")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  {
    actions, createNodeId, createContentDigest, store, cache
  },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  const processProduct = async (product, args) => {

    product.images = await Promise.all(product.images.map(async image => {
      let fileNode

      try {
        fileNode = await createRemoteFileNode({
          url: image.fullSize.url,
          ...args
        })

        image.localFile___NODE = fileNode.id
      } catch (e) {
        console.log("e", e)

      }
      if (fileNode) {
        console.log("createdFile node")
        image.localFile___NODE = fileNode.id
        return image
      }
    }))

    const nodeId = createNodeId(`ac-product-${product.id}`)
    const nodeContent = JSON.stringify(product)

    // Node info
    return Object.assign({}, product, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `acProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(product)
      }
    })
  }

  const apiUrl = `${process.env.GATSBY_DB}/wp-json/et-shop/graphql/products`
  const apiResponse = await fetch(apiUrl)
  const results = await apiResponse.json()

  await asyncForEach(results.data, async (product) => {
    const productNode = await processProduct(product, { store, cache, createNode, createNodeId })

    createNode(productNode)
  })
}

async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

