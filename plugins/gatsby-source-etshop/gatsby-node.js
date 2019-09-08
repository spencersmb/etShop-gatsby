const utils = require("./utils")
const fetch = require("node-fetch")
const fs = require("fs-extra")
const { createRemoteFileNode } = require(`gatsby-source-filesystem`)

exports.sourceNodes = async (
  {
    actions, createNodeId, createContentDigest, store, cache
  },
  configOptions
) => {
  const { createNode } = actions

  await fs.removeSync("/.cache")

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes a product to match Gatsby's node structure
  const processProduct = async (product, args, size) => {

    // https://flaviocopes.com/javascript-async-await-array-map/
    product.images = await Promise.all(product.images.map(async image => {
      let fileNode

      try {
        fileNode = await createRemoteFileNode({
          url: image[size].url,
          ...args
        })

      } catch (e) {
        console.log("e", e)

      }
      if (fileNode) {
        image.localFile___NODE = fileNode.id
        return image
      }
    }))

    const nodeId = createNodeId(`wc-product-${product.id}`)
    const nodeContent = JSON.stringify(product)

    // Node info
    return Object.assign({}, product, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `wcProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(product)
      }
    })
  }
  const processFeature = async (product, args) => {

    // https://flaviocopes.com/javascript-async-await-array-map/
    let fileNode

    try {
      fileNode = await createRemoteFileNode({
        url: product.featuredImage.url,
        ...args
      })

    } catch (e) {
      console.log("e", e)

    }
    if (fileNode) {
      product.featuredImage.localFile___NODE = fileNode.id
    }

    const nodeId = createNodeId(`wc-product-${product.id}`)
    const nodeContent = JSON.stringify(product)

    // Node info
    return Object.assign({}, product, {
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `wcProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(product)
      }
    })
  }

  const apiUrl = `${process.env.GATSBY_DB}/wp-json/et-shop/graphql/products`
  const apiResponse = await fetch(apiUrl)
  const results = await apiResponse.json()

  const jsonResults = JSON.stringify(utils.transformNormalizedData(results.data))
  fs.writeFileSync("src/state/products.json", jsonResults)

  await asyncForEach(results.data, async (product) => {
    const productNode = await processProduct(product, { store, cache, createNode, createNodeId }, "fullSize")
    const featureNode = await processFeature(product, { store, cache, createNode, createNodeId })

    createNode(productNode)
    createNode(featureNode)
  })

  // await asyncForEach(results.data, async (product) => {
  //   const productFullSizeNode = await processProduct(product, { store, cache, createNode, createNodeId }, "fullSize")
  //
  //   createNode(productFullSizeNode)
  // })
}

// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}
