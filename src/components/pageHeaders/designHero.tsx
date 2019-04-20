import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

function DesignHero (props: any) {
	return (
		<HeroContainer>
			<GridFluid>
				<HeroText>
					<h1>
						Design Resources
					</h1>
					<h3>
						for your creative projects
					</h3>
					<p>
						Discover unique textures, fonts and templates to finish your designs in a snap!
					</p>
				</HeroText>
				<HeroImageContainer>
					<HeroImage/>
				</HeroImageContainer>
			</GridFluid>
		</HeroContainer>
	)
}

const HeroContainer = styled.div`
	background: white;
	overflow-x: hidden;
	overflow-y: hidden;
	position: relative;
	z-index: 1;
`
const HeroText = styled.div`
	height: 700px;
	z-index: 2;
	@media ${device.tablet}{
		grid-column: 2 / 8;
	}
	@media ${device.laptop}{
		grid-column: 2 / 7;
	}
	
	h1{
		font-family: 'Sentinel', serif;
		font-size: 95px;
		font-weight: 600;
		line-height: 80px;
		margin: 186px 0 0;
		letter-spacing: -2px;
		color: ${colors.primary.text};
	}
	h3{
		font-family: 'Sentinel', serif;
		font-style: italic;
		font-size: 36px;
		font-weight: 600;
		color: ${colors.primary.pink};
		margin-bottom: 30px;
	}
	p{
		color: ${colors.grey.i800};
		font-size: 18px;
	}
`
const HeroImageContainer = styled.div`
	background: Green;
	position: relative;
	@media ${device.tablet}{
		grid-column: 8 / -1;
	}
	@media ${device.laptop}{
		grid-column: 7 / -1;
	}
	
	.gatsby-image-wrapper{
		position: absolute !important;
		top: -70px;
		left: -80px;
		//width: 1000px;
		@media ${device.tablet}{
			width: 600px;
		}
		@media ${device.laptop}{
			width: 1100px;
		}
	}
`

const HeroImage = () => (
	<StaticQuery
		query={graphql`
      query {
        desktopHero: file(relativePath: { eq: "color-palette.jpg" }) {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `}
		render={data => <Img fluid={data.desktopHero.childImageSharp.fluid}/>}
	/>
)
export default DesignHero