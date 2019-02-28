import MyShoppingCart from '@components/cart/cartStore'
import Receipt from '@components/modals/receipt'
import React, { ReactNode, useEffect, useRef } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ReduxToastr from 'react-redux-toastr'
import Header from './header'
import './layout.css'
import Modal from '@components/modals/wrapper'
import GlobalStyle from '@styles/global/globalStyles'

interface IlayoutProps {
	children: ReactNode,
}

const Layout = ({ children }: IlayoutProps) => {
	useEffect(() => {

	}, [])

  return (
		<StaticQuery
			query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
			render={data => (
				<>
					<GlobalStyle key='globalStyles'/>
					<MyShoppingCart key='myCart' defaultOpenState={false}/>
					<div id='app' style={{ position: 'relative', width: '100%' }}>
						<Header siteTitle={data.site.siteMetadata.title}/>
						<div style={{
							margin: `200px auto 0`,
							maxWidth: 960,
							padding: `0px 1.0875rem 1.45rem`,
							paddingTop: 0
						}}>
							<main>{children}</main>
							<footer>
								© {new Date().getFullYear()}, Built with
								{` `}
								<a href='https://www.gatsbyjs.org'>Gatsby</a>
							</footer>
							<ReduxToastr
								key='toastr'
								timeOut={3000}
								newestOnTop={false}
								preventDuplicates={false}
								position='bottom-right'
								transitionIn='fadeIn'
								transitionOut='fadeOut'
								progressBar={false}
							/>
						</div>
					</div>
					<Modal key='modal'/>
					{/*<Receipt*/}
						{/*closeModal={()=>null}*/}
						{/*options={{*/}
							{/*data:{*/}
								{/*total:'16',*/}
								{/*orderId:'430',*/}
								{/*email:'spencer@gmail.com',*/}
								{/*type:'Stripe',*/}
								{/*date:'1551315228792',*/}
								{/*downloads:[*/}
									{/*{*/}
										{/*download_url: 'http://shopeverytuesday.local/?download_file=222&order=wc_order_WACJ4jqOmzcx5&uid=48005c9bfbb9cc0aa69d683a821861fbfa5929e61e7bb4d52aa9268db9893836&key=831ced27-6944-4747-a419-99c292de9c0c',*/}
										{/*product_id: 222,*/}
										{/*product_name: 'Watercolor texture kit Vol. 1',*/}
										{/*product_url: 'http://shopeverytuesday.local/product/watercolor-texture-kit-vol-1/',*/}
										{/*order_id: 430,*/}
										{/*downloads_remaining: '',*/}
										{/*access_expires: null*/}
									{/*}*/}
								{/*]*/}
							{/*}*/}
						{/*}}*/}
						{/*/>*/}
				</>
			)}
		/>
  )
}

export default Layout

