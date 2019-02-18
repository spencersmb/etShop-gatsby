import ProductsListLayout from '@components/products/productsListLayout'
import React from 'react'
import { Link } from 'gatsby'
import WithDevTools from '../components/devToolExt'
import Layout from '../components/layout'
import Image from '../components/image'
import SEO from '../components/seo'

const IndexPage = () => (
	<Layout>
		<SEO title='home' keywords={[`gatsby`, `application`, `react`]}/>
		<h1>Hi people</h1>
		<ProductsListLayout/>
		<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
			<Image/>
		</div>
		<Link to='/page-2/'>Go to page 2</Link>
		<WithDevTools/>
	</Layout>
)

export default IndexPage
