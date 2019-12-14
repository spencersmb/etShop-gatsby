import PinkEmailForm from '@components/footer/emailForm'
import FooterGallery from '@components/footer/footerGallery'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { fakeApiCall } from '@utils/apiUtils'
import { useSetState } from '@utils/stateUtils'
import { renderSvg } from '@utils/styleUtils'
import { useScrollToElement } from '@utils/windowUtils'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import fetched from 'isomorphic-unfetch'

const Footer = ({ productPage, whiteFooter }: { productPage: boolean, whiteFooter: boolean }) => {

	// const scroll = useScrollToElement()

	return (
		<FooterContainer id={'my-div'} whiteFooter={whiteFooter}>
			{/*<FooterHeader>*/}
			{/*	<h4>Get notified</h4>*/}
			{/*	<p>when I release new products, send out promos or freebies.</p>*/}
			{/*</FooterHeader>*/}
			{/*<PinkEmailForm*/}
			{/*	handleSubmit={handleSubmit}*/}
			{/*	completed={state.completed}*/}
			{/*	hasError={state.hasError}*/}
			{/*	submitting={state.submitting}*/}
			{/*	invalid={state.error}*/}
			{/*	handleTextInput={handleTextInput}/>*/}
			{/*<FooterGallery/>*/}
			<FooterNav>

				<FooterNavWrapper productPage={productPage}>
					<FooterNavInner>
						<SvgCircle>
							{renderSvg(svgs.FooterCircle)}
						</SvgCircle>
						<Logo data-testid='footer-logo'>
							{renderSvg(svgs.ETLogo)}
						</Logo>
						<Links data-testid='footer-links'>
							<li>
								<Link to={'/products'}>
									Products
								</Link>
							</li>
							<li>
								<a href='https://every-tuesday.com' target='_blank' rel='noreferrer'>
									Blog
								</a>
							</li>
							<li>
								<Link to={'/support'}>
									Support
								</Link>
							</li>
							<li>
								<Link to={'/privacy'}>
									Privacy Policy
								</Link>
							</li>
						</Links>
						<SocialMediaLinks data-testid='social-links'>
							<li>
								<a href='https://www.youtube.com/user/everytues' target='_blank' rel='noreferrer'>
									{renderSvg(svgs.Youtube)}
								</a>
							</li>
							<li>
								<a href='https://www.instagram.com/everytuesday/' target='_blank' rel='noreferrer'>
									{renderSvg(svgs.Instagram)}
								</a>
							</li>
							<li>
								<a href='https://www.pinterest.com/teelac/' target='_blank' rel='noreferrer'>
									{renderSvg(svgs.Pinterest)}
								</a>
							</li>
							<li>
								<a href='https://www.facebook.com/everytues' target='_blank' rel='noreferrer'>
									{renderSvg(svgs.Facebook)}
								</a>
							</li>
							<li>
								<a href='https://twitter.com/teelacunningham' target='_blank' rel='noreferrer'>
									{renderSvg(svgs.Twitter)}
								</a>
							</li>
						</SocialMediaLinks>
					</FooterNavInner>
				</FooterNavWrapper>
			</FooterNav>
		</FooterContainer>
	)
}

const FooterContainer = styled.footer<{ whiteFooter: boolean }>`
	background: ${props => props.whiteFooter ? '#fff' : '#f7f8fc'};
	display: flex;
	flex-direction: column;
	//overflow: hidden;
	
	overflow-x: hidden;
`
const FooterHeader = styled.div`
	text-align: center;
	display: flex;
	flex-direction: column;
	padding: 0 20px;
	margin-top: 35px;
	h4{
		${Sentinel.reg};
		font-weight: 600;
		font-style: italic;
		color: ${colors.grey.i800};
		font-size: 48px;
	}
	p{
		font-size: 18px;
		color: ${colors.secondary.text};
		margin-bottom: 15px;
	}
	@media ${device.tablet}{
		margin-top: 70px;
		p{
				margin-bottom: 50px;
		}
	}

`

const SvgCircle = styled.div`
	position: absolute;
	top: -33px;
	left: 50%;
	transform: translateX(-50%);
	width: 530px;
	width: 100vw;
	z-index: 0;
	@media (min-width: 568px) {
		top: -53px;    
	}
		
	@media ${device.tablet} {
		top: -77px;
		width: 2300px;
	}
		
`

// footer nav
const FooterNav = styled.nav`
	padding: 0;
	width: 100%;
	position: relative;
	z-index: 0;
`
const FooterNavWrapper = styled.div<{ productPage: boolean }>`
	display: flex;
	flex-direction: column;
	background: #fff;
	width: 100%;
	z-index: 1;
	position: relative;
	padding: 0 0 45px;
	margin-top: 100px;
	
	@media ${device.tablet}{
		padding: 0 0 ${props => props.productPage ? '130px' : '45px'};
	}
	
	@media ${device.laptop}{
		flex-direction: row;
		align-items: baseline;
		padding: 0 0 ${props => props.productPage ? '145px' : '65px'};
	}

`
const FooterNavInner = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 auto;
	align-items: center;
	width: 100%;
	max-width: 1200px;
	padding: 0 15px;
	
	@media ${device.laptop}{
		flex-direction: row;
		align-items: baseline;
	}
`
const Logo = styled.div`
	width: 260px;
	margin-bottom: 30px;
	z-index: 2;
	position: relative;
	svg{
		width: 100%;
	}
	
	@media ${device.laptop}{
		margin-bottom: 0;
	}
`
const Links = styled.ul`
	z-index: 2;
	position: relative;
	display: flex;
	flex-direction: column;
	padding: 0;
	flex: 1;
	align-items: center;
	justify-content: center;
	margin-bottom: 30px;
	li{
		list-style: none;
		text-transform: uppercase;
		font-weight: 600;
		color: ${colors.primary.headline};
		font-size: 14px;
		padding: 0 20px;
		margin-bottom: 20px;
	}
	a{
		color: ${colors.primary.headline};
	}
	
	@media ${device.tablet}{
		flex-direction: row;
		
		li{
			margin-bottom: 0;
		}
	}
	
	@media ${device.laptop}{
		margin-bottom: 0;
	}
`
const SocialMediaLinks = styled.ul`
	display: flex;
	flex-direction: row;
	align-items: center;
	margin: 0;
	padding:0;
	z-index: 2;
	position: relative;
	li{
		margin: 0 10px;
		width: 24px;
		list-style: none;
		svg{
			position: relative;
			path{
				fill: ${colors.grey.i800};
			}
		}
	}
`

export default Footer
