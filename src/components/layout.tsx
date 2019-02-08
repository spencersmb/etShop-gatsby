import React, { ReactNode } from 'react'
import { StaticQuery, graphql, Link } from 'gatsby'
import Header from './header'
import './layout.css'
import { connect } from 'react-redux'

const Counter = ({ count, increment }: {count: number, increment: any}) => (
  <div>
    <p>Count: {count}</p>
    <button onClick={increment}>Increment</button>
  </div>
)

const mapStateToProps = ({ count }:{count: number}) => {
  return { count }
}

const mapDispatchToProps = (dispatch: any) => {
  return { increment: () => dispatch({ type: `INCREMENT` }) }
}

const ConnectedCounter = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter)


interface Ilayout {
  children: ReactNode
}
const Layout = ({ children }:Ilayout) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
        allEtShopProduct{
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
        <Header siteTitle={data.site.siteMetadata.title} />
        <div
          style={{
            margin: `0 auto`,
            maxWidth: 960,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          <ConnectedCounter/>
          <ul>
            {data.allEtShopProduct.edges.map(({node}: any)=>{
              return(
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
        </div>
      </>
    )}
  />
)


export default Layout
