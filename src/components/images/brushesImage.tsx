import { graphql, StaticQuery } from 'gatsby'
import React from 'react'
import Img from 'gatsby-image'

const BrushesImg = () => {
  return (
		<StaticQuery
			query={graphql`
      query {
        desktopHero: file(relativePath: { eq: "outlined-brushes-full.png" }) {
          childImageSharp {
            fluid(maxWidth: 447) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
			render={data => {
				return <Img
					alt='Water brush and painting supplies from Every-Tuesday Digital Shop'
					fluid={data.desktopHero.childImageSharp.fluid}
					fadeIn={true}
					critical={false}
				/>
			}
			}
		/>
  )
}

export default BrushesImg