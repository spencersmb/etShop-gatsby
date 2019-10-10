import ProductListItem from '@components/products/productListItem'
import React from 'react'

const RelatedProduct = ({ slug, data }: { slug: string, data?: any }) => {
	const product = data.allWcProduct.edges.find(
		(edge: any) =>
			edge.node.slug === slug
	)
	if (!!product) {
		return <ProductListItem {...product.node}/>
	} else {
		return null
	}
}

export default RelatedProduct
