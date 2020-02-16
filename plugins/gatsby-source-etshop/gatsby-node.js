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

    if (product.font_preview.enabled) {
      product.font_preview.styles = await Promise.all(product.font_preview.styles.map(async (style, styleIndex) => {
        style.font_files = await Promise.all(style.font_files.map(async (font, index) => {
          let fileNode

          try {
            fileNode = await createRemoteFileNode({
              url: font.file,
              ...args
            })

          } catch (e) {
            console.log("e", e)

          }
          if (fileNode) {
            font.localFile___NODE = fileNode.id
          }
          return font
        }))
        return style
      }))
    }

    product.featuredImage = await processFeatureV2(product.featuredImage, args)

    if (product.youtube_gallery_items.length > 0) {
      product.youtube_gallery_items = await Promise.all(product.youtube_gallery_items.map(async youtubeItem => {
        let fileNode

        try {
          fileNode = await createRemoteFileNode({
            url: youtubeItem.video_thumbnail.url,
            ...args
          })

        } catch (e) {
          console.log("e", e)

        }
        if (fileNode) {
          youtubeItem.video_thumbnail.localFile___NODE = fileNode.id
          return youtubeItem
        }
      }))
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
  const processFeatureV2 = async (feature, args) => {
    let fileNode

    try {
      fileNode = await createRemoteFileNode({
        url: feature.url,
        ...args
      })

    } catch (e) {
      console.log("e", e)

    }
    if (fileNode) {
      feature.localFile___NODE = fileNode.id
      return feature
    }
  }

  const apiUrl = `${process.env.GATSBY_DB}/wp-json/et-shop/v1/products/getAll`
  const apiResponse = await fetch(apiUrl)
  const results = await apiResponse.json()

  const jsonResults = JSON.stringify(utils.transformNormalizedData(results.data))
  fs.writeFileSync("src/state/products.json", jsonResults)

  await asyncForEach(results.data, async (product, index) => {
    const productNode = await processProduct(product, { store, cache, createNode, createNodeId }, "fullSize")

    // const featureNode = await processFeature(product, { store, cache, createNode, createNodeId })

    createNode(productNode)
    // createNode(featureNode)
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
