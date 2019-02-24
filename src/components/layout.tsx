import MyShoppingCart from '@components/cart/cartStore'
import React, { ReactNode } from 'react'
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
							margin: `0 auto`,
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
							<Modal key='modal'/>
						</div>
					</div>
				</>
			)}
		/>
  )
}

export default Layout

