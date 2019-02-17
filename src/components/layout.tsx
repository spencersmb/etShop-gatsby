import { IAuthResponse } from '@et/types/User'
import { ILoginAction, loginUserSuccess } from '@redux/actions/authActions'
import { loadUser } from '@utils/authUtils'
import React, { ReactNode, useEffect, useRef } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import { connect } from 'react-redux'
import ReduxToastr from 'react-redux-toastr'
import { Dispatch, Action } from 'redux'
import Header from './header'
import './layout.css'
import Modal from '@components/modals/wrapper'
import GlobalStyle from '@styles/global/globalStyles'

interface IlayoutProps {
	children: ReactNode,
	loginUserAction: ILoginAction
}

const Layout = ({ children, loginUserAction }: IlayoutProps) => {

  return (
		<StaticQuery
			query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allWcProduct{
          edges{
            node{
              id
              name
              slug
            }
          }
        }
      }
    `}
			render={data => (
				<>
					<GlobalStyle key='globalStyles'/>
					<Header siteTitle={data.site.siteMetadata.title}/>
					<div
						style={{
							margin: `0 auto`,
							maxWidth: 960,
							padding: `0px 1.0875rem 1.45rem`,
							paddingTop: 0
						}}
					>
						<ul>
							{data.allWcProduct.edges.map(({ node }: any) => {
								return (
									<li key={node.id}>
										<Link to={`/products/${node.slug}`}>
											{node.name}
										</Link>
									</li>
								)
							})}
						</ul>
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
				</>
			)}
		/>
  )
}

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
	return {
		loginUserAction: (user: IAuthResponse) => dispatch(loginUserSuccess(user))
	}
}
export default connect(null, mapDispatchToProps)(Layout)

