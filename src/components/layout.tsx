import MyShoppingCart from '@components/cart/cartStore'
import React, { ReactNode, useEffect, useRef } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import ReduxToastr from 'react-redux-toastr'
import Header from './header'
import Modal from '@components/modals/wrapper'
import GlobalStyle from '@styles/global/globalStyles'
import { PageContainer } from '@styles/global/pages'

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
						<PageContainer>
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
						</PageContainer>
					</div>
					<Modal key='modal'/>
				</>
			)}
		/>
  )
}

export default Layout

