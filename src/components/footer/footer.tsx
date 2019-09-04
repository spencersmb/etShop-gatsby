import { useSetState } from '@components/account/dashboard'
import PinkEmailForm from '@components/footer/emailForm'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { fakeApiCall } from '@utils/apiUtils'
import { renderSvg } from '@utils/styleUtils'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'
import fetched from 'isomorphic-unfetch'

const Footer = () => {

	const [state, setState] = useSetState({
		email: '',
		submitting: false,
		completed: false,
		submitted: false,
		error: null
	})

	async function handleSubmit (e: any) {
		e.preventDefault()
		console.log('submit email', state.email)
		setState({ submitting: true })

		const url = 'https://api.convertkit.com/v3/forms/173619/subscribe'
		const formData = new FormData()
		formData.append('api_key', process.env.GATSBY_CONVERTKIT_KEY || '')
		formData.append('email', state.email)
		// formData.append('first_name', 'spencer')
		try {
			const testResult = fakeApiCall()
			await testResult

			// WORKING DATA
			const result = await fetched(
				url,
				{
					body: formData,
					method: 'POST'
				}
			)
			const resultData = await result.json()
			setState({
				submitting: false,
				hasError: false,
				completed: true
			})
			console.log('result', resultData)

		} catch (error) {
			console.log('error', error)
			setState({
				completed: false,
				submitting: false,
				hasError: true,
				error: true
			})
		}

		if (state.error) {

		}
		setTimeout(() => {
			// reset
			setState({
				error: null
			})
		}, 2500)
	}

	function handleTextInput (e: any) {
		setState({
			email: e.target.value
		})
	}

	return (
		<FooterContainer>
			<FooterHeader>
				<h4>Get notified</h4>
				<p>when I release new products, send out promos or freebies.</p>
			</FooterHeader>
			<PinkEmailForm
				handleSubmit={handleSubmit}
				completed={state.completed}
				hasError={state.hasError}
				submitting={state.submitting}
				error={state.error}
				handleTextInput={handleTextInput}/>
			<FooterNav>
				<SvgCircle>
					{renderSvg(svgs.FooterCircle)}
				</SvgCircle>
				<FooterNavInner>
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
			</FooterNav>
		</FooterContainer>
	)
}

const FooterContainer = styled.footer`
	background: ${colors.grey.i200};
	display: flex;
	flex-direction: column;
	overflow: hidden;
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
	top: -100px;
	left: 50%;
	transform: translateX(-50%);
	width: 2300px;
	z-index: 0;
`

// footer nav
const FooterNav = styled.nav`
	padding: 45px 0;
	width: 100%;
	background: white;
	position: relative;
	z-index: 0;
	
	@media ${device.laptop}{
		padding: 45px 0 65px;
	}
`

const FooterNavInner = styled.div`
	display: flex;
	flex-direction: column;
	max-width: 1200px;
	margin: 0 auto;
	z-index: 1;
	position: relative;
	align-items: center;
	
	@media ${device.laptop}{
		flex-direction: row;
		align-items: baseline;
	}
`
const Logo = styled.div`
	width: 260px;
	margin-bottom: 30px;
	svg{
		width: 100%;
	}
	
	@media ${device.laptop}{
		margin-bottom: 0;
	}
`
const Links = styled.ul`
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
		color: ${colors.secondary.text};
		font-size: 18px;
		padding: 0 20px;
		margin-bottom: 20px;
	}
	a{
		color: ${colors.secondary.text};
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
