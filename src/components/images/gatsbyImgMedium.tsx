import React from 'react'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'

interface IProps {
	imgName: string
	fade?: boolean
	critical?: boolean,
	classes?: string,
	altTag?: string
}

const GatsbyImgMedium = ({ imgName, fade = true, critical = false, classes = '', altTag = 'Every-Tuesday Course' }: IProps) => (
	<StaticQuery
		query={graphql`
      query {
        allFile{
          edges{
            node{
              name
              id
              relativePath
              childImageSharp{
                fluid(maxWidth: 1200) {
                    ...GatsbyImageSharpFluid
                    originalName
                  }
              }
            }
          }
        }
      }
    `}
		render={data => {

			const image = data.allFile.edges.find(
				(edge: any) =>
					edge.node.relativePath === imgName
			)

			if (!image) {
				return null
			}
			return <Img
				fadeIn={fade}
				critical={critical}
				alt={altTag}
				className={classes}
				fluid={image.node.childImageSharp.fluid}
			/>
		}}
	/>
)

export default GatsbyImgMedium
