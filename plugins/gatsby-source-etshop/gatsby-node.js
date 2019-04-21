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
  const processProduct = async (product, args) => {

    // https://flaviocopes.com/javascript-async-await-array-map/
    product.images = await Promise.all(product.images.map(async image => {
      let fileNode

      try {
        fileNode = await createRemoteFileNode({
          url: image.fullSize.url,
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

  const apiUrl = `${process.env.GATSBY_DB}/wp-json/et-shop/graphql/products`
  const apiResponse = await fetch(apiUrl)
  const results = await apiResponse.json()

  const jsonResults = JSON.stringify(utils.transformNormalizedData(results.data))
  fs.writeFileSync("src/state/products.json", jsonResults)

  await asyncForEach(results.data, async (product) => {
    const productNode = await processProduct(product, { store, cache, createNode, createNodeId })

    createNode(productNode)
  })
}

// https://codeburst.io/javascript-async-await-with-foreach-b6ba62bbf404
async function asyncForEach (array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

// exports.onCreateNode = async ({
//                                 node,
//                                 actions,
//                                 createNodeId,
//                                 store,
//                                 cache
//                               }) => {
//   const { createNodeField, createNode } = actions
//   if (node.internal.type === "wcProduct") {
//     // console.log('productNdoe', node.featuredImage.fullSize.url)
//     const itemsToAdd = []
//     await asyncForEach(node.images, async (image) => {
//       try {
//
//         const galleryImageFileNode = await createRemoteFileNode({
//           url: image.fullSize.url,
//           store,
//           cache,
//           createNode,
//           createNodeId
//         })
//
//         // createNodeField({
//         //   node,
//         //   name: `wcProductImages___NODE`,
//         //   value: galleryImageFileNode.id
//         // })
//
//         itemsToAdd.push(galleryImageFileNode.id)
//
//       } catch (e) {
//         console.log(e)
//       }
//     })
//
//     // node.images.forEach(async (image, index) => {
//     //     //   try {
//     //     //
//     //     //     const galleryImageFileNode = await createRemoteFileNode({
//     //     //       url: image.fullSize.url,
//     //     //       store,
//     //     //       cache,
//     //     //       createNode,
//     //     //       createNodeId
//     //     //     })
//     //     //     createNodeField({
//     //     //       node,
//     //     //       name: `wcProductImages___NODE`,
//     //     //       value: galleryImageFileNode.id
//     //     //     })
//     //     //
//     //     //     itemsToAdd.push(galleryImageFileNode.id)
//     //     //
//     //     //   } catch (e) {
//     //     //     console.log(e)
//     //     //   }
//     //     // })
//     createNodeField({
//       node,
//       name: `wcProductImages___NODE`,
//       value: itemsToAdd
//     })
//     try {
//
//       // const featureImageFileNode = await createRemoteFileNode({
//       //   url: node.featuredImage.fullSize.url,
//       //   store,
//       //   cache,
//       //   createNode,
//       //   createNodeId
//       // })
//       // const featureImageThumbNode = await createRemoteFileNode({
//       //   url: node.featuredImage.thumbnail.url,
//       //   store,
//       //   cache,
//       //   createNode,
//       //   createNodeId
//       // })
//
//       // Feature Image
//       // createNodeField({
//       //   node,
//       //   name: "etFeatureImageFullSize___NODE",
//       //   value: featureImageFileNode.id
//       // })
//       //
//       // // Feature Thumb
//       // createNodeField({
//       //   node,
//       //   name: "etFeatureImageThumb___NODE",
//       //   value: featureImageThumbNode.id
//       // })
//     } catch (err) {
//       console.log(err)
//     }
//   }
// }