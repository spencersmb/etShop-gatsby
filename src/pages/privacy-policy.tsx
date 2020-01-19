import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'
import SEO from '../components/seo'

const PrivacyPage = () => (
	<Layout>
		<SEO title='Privacy Page'/>
		<h1>Privacy Page</h1>
		<p>Welcome</p>
		<Link to='/'>Go back to the homepage</Link>
	</Layout>
)

export default PrivacyPage
