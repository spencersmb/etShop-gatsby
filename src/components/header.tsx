import { Link } from 'gatsby'
import React from 'react'
import Navbar from './nav/navbar'
interface Iheader {
  siteTitle?: string
}
const Header = ({ siteTitle=`` }:Iheader) => (
  <header
    style={{
      background: `rebeccapurple`,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to='/'
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        color: `#fff`,
        listStyle: `none`
      }}
    >
      <Navbar/>
    </div>
  </header>
)


export default Header
