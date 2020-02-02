import AuthApi from '@api/authApi'
import FindMyOrderBar from '@components/forms/inputs/findMyOrderBar'
import GatsbyImgMedium from '@components/images/gatsbyImgMedium'
import SignUpTeaser from '@components/pageHeaders/signUpTeaser'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { fakeApiCall, toastrOptions } from '@utils/apiUtils'
import { createStandardJSONLD, facebookDefaultMeta, twitterDefaultMeta } from '@utils/socialUtils'
import { useSetState } from '@utils/stateUtils'
import { graphql } from 'gatsby'
import React from 'react'
import posed from 'react-pose'
import { toastr } from 'react-redux-toastr'
import styled from 'styled-components'
import Layout from '../components/layout'
import SEO from '../components/seo'

const ForgotPasswordPage = ({ data }: any) => {
	const { site, featureImage } = data
	const twitterAddons = [
		{
			name: `twitter:card`,
			content: `summary_large_image`
		},
		{
			name: `twitter:title`,
			content: `${site.siteMetadata.title}`
		},
		{
			name: `twitter:description`,
			content: `${site.siteMetadata.description}`
		},
		{
			name: `twitter:image`,
			content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
		}
	]
	const facebookAddons = [
		{
			property: `og:title`,
			content: site.siteMetadata.title
		},
		{
			property: `og:description`,
			content: site.siteMetadata.description
		},
		{
			property: 'og:site_name',
			content: site.siteMetadata.title
		},
		{
			property: `og:url`,
			content: `${site.siteMetadata.siteUrl}`
		},
		{
			property: 'og:image',
			content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
		},
		{
			property: 'og:image:secure_url',
			content: `${site.siteMetadata.siteUrl}${featureImage.childImageSharp.fluid.src}`
		},
		{
			property: 'og:image:alt',
			content: `${site.siteMetadata.title}`
		},
		{
			property: 'og:image:type',
			content: ' image/jpeg'
		},
		{
			property: 'og:image:width',
			content: '1024'
		},
		{
			property: 'og:image:height',
			content: '648'
		}
	]
	const [state, setState] = useSetState<{
		orderId: string,
		email: string,
		submitting: boolean,
		completed: boolean
	}, {
		orderId?: string,
		email?: string,
		submitting?: boolean,
		completed?: boolean
	}>({
		orderId: '',
		email: '',
		submitting: false,
		completed: false
	})

	const getOrder = async () => {
		const call = await AuthApi.getGuestOrder(state)

		if (call.status !== 200) {
			throw await call.json()
		}

		return call.json()
	}

	const handleSubmit = async () => {
		toastr.clean()
		setState({
			submitting: true
		})
		try {
			await getOrder()
			setState({
				submitting: false,
				completed: true
			})
			toastr.success('Order Found!', 'Please check your email.', toastrOptions.noHover)
		} catch (e) {
			setState({
				submitting: false
			})
			toastr.error('Error', e.message, toastrOptions.noHover)
		}

	}

	const handleInputChange = (e: any) => {
		const type = e.target.getAttribute('data-input')
		if (type === 'orderId') {
			setState({
				orderId: e.target.value
			})
		} else if (type === 'email') {
			setState({
				email: e.target.value
			})
		}
	}

	return (
		<Layout whiteFooter={true}>
			<SEO
				title='Find My Order'
				description={`${site.siteMetadata.description}`}
				keywords={[`gatsby`, `application`, `react`]}
				meta={[
					{
						property: `og:type`,
						content: `website`
					},
					...facebookDefaultMeta(facebookAddons),
					...twitterDefaultMeta(twitterAddons)
				]}
			>
				<link rel='canonical' href={process.env.GATSBY_DB}/>
				<script type='application/ld+json'>{JSON.stringify(createStandardJSONLD({
					siteUrl: site.siteMetadata.siteUrl,
					featureImgSrc: featureImage.childImageSharp.fluid.src
				}))}</script>
			</SEO>
			<PageContainer>
				<HeaderOne pose={state.completed ? 'closed' : 'open'}>
					<HeaderContent>
						<HeaderText>
							<h1>Find my order</h1>
							<p>If you need a copy of your order emailed to you or you need new download links refreshed, fill out the
								form below. <span className={`legal`}>** Download links last 24 hrs</span></p>
						</HeaderText>
						<HeaderImg>
							<GatsbyImgMedium imgName={'outlined-brushes-full.png'}/>
						</HeaderImg>
						<FindMyOrderBar
							handleSubmit={handleSubmit}
							handleInputChange={handleInputChange}
							state={state}/>
					</HeaderContent>

				</HeaderOne>
				<SignUpTeaser/>
			</PageContainer>
		</Layout>
	)
}
const HeaderText = styled.div`
	color:${colors.primary.headline};
	h1{
		color:${colors.primary.headline};
		${Sentinel.semiboldItalic};
		font-size: 45px;
		font-weight: 300;
	}
	
	.legal{
		font-weight: bold;
		display: block;
		margin-top: 20px;
	}
	
	@media ${device.tablet} {
		width: 60%;
		h1{
			font-size: 55px;
			margin-bottom: 10px;
		}
		.legal{
			font-size: 14px;
			display: inline;
			margin-top:0;
		}
	}
	@media ${device.laptop} {
		width: 50%;
		h1{
			font-size: 75px;
		}
		.legal{
			display: block;
			margin-top: 20px;
		}
		
	}
		
`
const HeaderImg = styled.div`
	display: none;
	@media ${device.tablet} {
		position: absolute;
		display: block;
		max-width: 400px;
		width: 100%;
		top: 50px;
		right: -50px;
	}
	
	@media ${device.laptop} {
		max-width: 500px;
	}
		
`
const HeaderContent = styled.div`
	padding: 30px 20px;
	position: relative;
	@media ${device.tablet} {
		padding: 30px;
		max-width: 1100px;
		width: 100%;
		margin: 0 auto;
	}
	@media ${device.laptop} {
		padding: 60px 30px;
	}
		
`
const PageContainer = styled.div`
	background: #fff;
	position: relative;
	z-index: 1;
	flex: 1;
`

const HeaderOnePose = posed.div({
	open: {
		height: 'auto'
	},
	closed: {
		height: 0
	}
})
const HeaderOne = styled(HeaderOnePose)`
	background: ${colors.purple.i200};
	overflow: hidden;
	z-index: 2;
	position: relative;
	@media ${device.tablet} {
	
	}
		
`

export default ForgotPasswordPage

export const query = graphql`
    query FindOrderPageQuery {
        site {
            siteMetadata {
                title
                siteUrl
                description
                authorUrl
                frontEndUrl
            }
        }
        featureImage: file(relativePath: { eq: "color-palette.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1024) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`
