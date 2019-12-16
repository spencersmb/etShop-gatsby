import GatsbyImgMedium from '@components/images/gatsbyImgMedium'
import Login from '@components/modals/login'
import { IState } from '@et/types/State'
import { IShowModalAction, showModal } from '@redux/actions/modalActions'
import { device } from '@styles/global/breakpoints'
import { ButtonReg, ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import React from 'react'
import { connect } from 'react-redux'
import { Action, bindActionCreators, Dispatch } from 'redux'
import styled from 'styled-components'

interface IPropsActions {
	showModal: IShowModalAction
}

const SignUpTeaser = (props: IPropsActions) => {
	const openModal = () => {
		props.showModal({
			modal: Login,
			// modal: Receipt,
			options: {
				closeModal: true,
				hasBackground: true,
				name: 'signup'
			}
		})
	}
	return (
		<TeaserContainer>
			<LaptopImage>
				<GatsbyImgMedium
					imgName={'macbook-dashboard.png'}/>
			</LaptopImage>
			<SignUpContainer>
				<h2>
					Save 10% on your next purchase.
				</h2>
				<BlockHighlights>
					<HighlightItem>
						Create an account and save 10%!
					</HighlightItem>
					<HighlightItem>
						Easily manage your orders
					</HighlightItem>
				</BlockHighlights>
				<Description>
					Can’t find your reciept in your email? Did your download links expire? Just log back in and take care of them
					all in one place! Sign up now and instantly get a 10% coupon off your entire cart.
				</Description>
				<SignUpBtnWrapper>
					<SignUpBtn
						onClick={openModal}
						color={colors.teal.i500}
						textColor={'#fff'}
						hoverColor={colors.teal.i800}
						hoverTextColor={'#fff'}
						outline={false}
					>
						Sign Up Today!
					</SignUpBtn>
				</SignUpBtnWrapper>
			</SignUpContainer>
		</TeaserContainer>
	)
}

const mapDispatchToProps = (dispatch: Dispatch<Action>): any => {
	return {
		showModal: bindActionCreators(showModal, dispatch)
	}
}
export default React.memo(connect<null, IPropsActions, any, IState>(null, mapDispatchToProps)(SignUpTeaser))

const SignUpBtnWrapper = styled.div`
`
const SignUpBtn = styled(ButtonReg)`

`
const Description = styled.p`
	color: ${colors.primary.headline};
`
const HighlightItem = styled.p`
	margin: 0;
	font-size: 21px;
	line-height: 28px;
	padding-right: 10px;
	color: ${colors.primary.headline};
	max-width: 210px;
	
	@media ${device.tablet} {
		font-size: 24px;
		padding-right: 20px;
		max-width: 220px;
	}	
	
	@media ${device.laptop} {
		font-size: 24px;
		max-width: 220px;
	}
	
	@media ${device.laptopL} {
		margin-right: 30px;
	}
		
`

const BlockHighlights = styled.div`
	display: flex;
	flex-direction: row;
	margin: 30px 0;
	
	@media ${device.tablet} {
		flex-direction: row;
		margin: 40px 0;
		justify-content: flex-start;
	}
		
`

const LaptopImage = styled.div`
	display: none;
	@media ${device.tablet} {
		grid-column: 1 / 7;
		position: relative;
		z-index: 1;
		display: block;
		.gatsby-image-wrapper{
			position: absolute !important;
			top: 75%;
			right: -150px;
			width: 1140px;
			transform: translateY(-50%);
		}
	}
	
	@media ${device.laptop} {
		.gatsby-image-wrapper{
			top: 63%;
			right: -260px;
			width: 1270px;
		}
	}
	
	@media ${device.laptopL} {
		.gatsby-image-wrapper{
			//top: 80%;
    	width: 1340px;
		}
	}
		
		
`

const SignUpContainer = styled.div`
	grid-column: 2 / 4;
	margin: 30px 0;
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 2;
	h2{
		font-size: 43px;
		line-height: 45px;
		${Sentinel.semiboldItalic};
		font-weight: 400;
		margin: 0;
		color:${colors.primary.headline};
	}
	
	@media ${device.tablet} {
		margin: 90px auto;
		grid-column: 7 / 14;
		h2{
			font-size: 50px;
			line-height: 50px;
		}
	}
	@media ${device.laptop} {
		grid-column: 8 / 14;
		margin: 60px auto 180px;
	}
	@media ${device.laptopL} {
		h2{
			font-size: 75px;
			line-height: 75px;
		}
	}
		
`

const TeaserContainer = styled(GridFluid)`
	padding: 0;
`
