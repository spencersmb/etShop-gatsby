import PaginationBar from '@components/nav/paginationBar'
import React, { useEffect } from 'react'
import Layout from '../components/layout'
import SEO from '../components/seo'

interface IlayoutProps {
	path: string,
	uri: string,
	navigate: any,
	location: {
		search: string
	}
}

const total = 5
const UserLayout = (Component: React.ComponentType<any>) => (props: IlayoutProps) => {

	// const currentPage = getCurrentPage(props.location.search, total) // move to pagniation instead?
	// on first mount get the current page Orders

	// on each rerender - dispatch action to get orders, if they already exist just return state.
	useEffect(() => {

	}, [])
	console.log('render HOC')

	return (<Layout>
			<SEO
				title='dashboard'
				description={`description for home`}
				keywords={[`gatsby`, `application`, `react`]}
				meta={[
					{
						property: `og:type`,
						content: `website`
					}
				]}
			>
				<link rel='canonical' href='http://mysite.com/'/>
			</SEO>
			<h1>User layout template</h1>
			<div>
				<Component {...props}/>
			</div>
			{/*<PaginationBar currentPage={props.location.search} total={total}/>*/}
		</Layout>
	)
}
export default UserLayout