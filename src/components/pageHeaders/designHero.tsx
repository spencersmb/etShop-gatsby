import SupportCard from '@components/cards/supportCard'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import { graphql, StaticQuery } from 'gatsby'
import Img from 'gatsby-image'
import React from 'react'
import styled from 'styled-components'

const supportCards = [
	{
		theme: 'purple',
		title: 'Expired downloads?',
		text: 'Download links with your order last 24 hrs. If you’re already a customer then just log in to refresh them. If you checked out as a guest then click here.',
		icon: 'DownloadArrows',
		link: '/findMyOrder'
	},
	{
		theme: 'teal',
		title: 'Support for products',
		text: 'Need help installing a font for the first time? Maybe unzipping items on an iPad? Explore the support section to get up and creating quickly.',
		icon: 'QuestionMarks',
		link: '/support'
	}
]

function DesignHero () {
	return (
		<HeroContainer id={'header'}>
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
			<SupportCardsContainer>
				{supportCards.map(card => (<SupportCard key={card.title} {...card}/>))}
			</SupportCardsContainer>
		</HeroContainer>
	)
}

const SupportCardsContainer = styled.div`
	display: flex;
	background: #fff;
	flex-direction: column;
	max-width: 1200px;
	margin: 0 auto;
	padding: 20px 20px 40px;	
	
	@media ${device.tablet} {
		flex-direction: row;
		padding: 0 50px 30px;
	}
	@media ${device.laptop} {
		max-width: 1290px;
		padding: 0 45px 30px;
	}
	@media ${device.laptopL} {
		max-width: 1200px;
		padding: 0 0px 30px;
	}
	
`
const HeroContainer = styled.div`
	background: white;
	overflow-x: hidden;
	position: relative;
	z-index: 1;
	padding: 0 20px;
`
const HeroText = styled.div`
	z-index: 2;
	grid-column: 1 / -1;
	max-width: 372px;
	margin: 60px auto 30px;
	grid-row: 1;
	
	h1{
		${Sentinel.reg};
		font-style: normal;
		font-weight: 400;
		letter-spacing: -.5px;
		color: ${colors.purple.i500};
		font-size: 55px;
		line-height: 53px;
		margin-top: 80px;
	}
	h3{
		${Sentinel.reg};
		font-style: italic;
		font-weight: 600;
		color: ${colors.grey.i800};
		font-size: 24px;
		line-height: 32px;
		margin-bottom: 30px;
	}
	p{
		color: ${colors.grey.i800};
		font-size: 18px;
	}
	
	@media ${device.tablet}{
		grid-column: 2 / 8;
		max-width: none;
		margin: 0 auto 30px;

		h1{
			font-size: 95px;
			font-weight: 600;
			line-height: 80px;
			margin: 90px 0 15px;
		}
		h3{
			font-size: 36px;
			margin-bottom: 30px;
		}
	}
	@media ${device.laptop}{
		grid-column: 2 / 7;
		margin-bottom: 60px;
	}
`
const HeroImageContainer = styled.div`
	//background: Green;
	position: relative;
	grid-column: 3 / -1;
	grid-row: 1;
	width: 519px;
	left: -387px;
	top:-125px;
	transform: rotate(-203deg);
	@media ${device.tablet}{
		top:-30px;
		width: 720px;
		left: -20px;
		position: relative;
		grid-column: 8 / -1;
		transform: rotate(30deg);
	}
	@media ${device.laptop}{
		grid-column: 7 / -1;
		left: 0;
		top: 0;
		width: 100%;
		transform: rotate(0);
	}
	
	.gatsby-image-wrapper{
		position: absolute !important;
		width: 100%;
		
		@media ${device.tablet}{

		}
		@media ${device.laptop}{
			width: 1170px;
			top: -137px;
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
		render={data => {
			return <Img
				alt='Every-Tuesday Digital Shop'
				fluid={data.desktopHero.childImageSharp.fluid}
				fadeIn={false}
				loading={'eager'}
			/>
		}
		}
	/>
)
export default DesignHero
