import { IUser } from '@et/types/User'
import { device } from '@styles/global/breakpoints'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { FlexRow } from '@styles/global/cssGrid'
import posed from 'react-pose'
import styled from 'styled-components'

interface INavLinkProps {
	isMobile: boolean
}

export const Nav = styled.nav`
	background: white;
	margin: 5px 15px;
	height: 65px;
	width: 100%;
	display: grid;
	align-items: center;
	grid-template-columns: minmax(50px,1fr) minmax(50px,auto) minmax(50px,auto);
	@media ${device.tablet} {
		margin: 5px 50px;
	}
	@media ${device.laptop} {
		margin: 0 15px;
		grid-template-columns: repeat(3,minmax(auto,1fr));
		position: relative;
		height: 87px;
	}
`
export const Hamburger = styled.div`
	display: flex;
	width: 50px;
	height: 50px;
	align-items: center;
	justify-content: center;
	svg{
		width: 100%;
		max-width: 35px;
	}
	.hamburger-close{
		max-width: none;
	}
	@media ${device.laptop} {
		display: none;
	}
`
export const Logo = styled.div`
	display: grid;
	align-items: center;
	svg{
		width: 100%;
	}
`
export const LogoContainer = styled.div`
		max-width: 140px;
	@media ${device.laptop}{
		max-width: 200px;
	}
`

const NavLinksPose = posed.div({
	open: {
		x: 0,
		delayChildren: 500,
		staggerChildren: 50,
		transition: {
			duration: 600,
			ease: [1, 0, 0, 1]
		}
	},
	closed: {
		x: `-100%`,
		staggerChildren: 20,
		transition: {
			ease: [1, 0, 0, 1]
		}
	}
})
export const NavLinks = styled(NavLinksPose)<INavLinkProps>`
	grid-column: 1 / -1;
	position: absolute;
	left: 0;
	//top: ${props => props.isMobile ? '75px' : '0px'};
	top: 75px;
	height: 100vh;
	width: 100%;
	background: ${colors.primary.headline};	
	
	a{
		color: #fff;
	}
	
	@media ${device.laptop} {
		position: relative;
		background: white;
		top: 0px;
		grid-column: 2 / -1;
		display: grid;
		grid-template-columns: repeat(2,minmax(auto,1fr));
		height: 100%;
		transform: translateX(0) !important;
		transition: 0s;
		
		a{
			color: ${colors.primary.text};
		}
	}
		
`
export const CloseButton = styled.div`
	position: absolute;
	top: 0;
	right: 15px;
	background: purple;
	width: 50px;
	height: 50px;
	
	@media ${device.laptop} {
		display: none;
	}
`
const NavItemPose = posed.li({
	open: { opacity: 1, x: 0 },
	closed: { opacity: 0, x: -20 }
})

export const NavItem = styled(NavItemPose)`
	${props => props.hideOnDesktop ? `
		@media ${device.laptop} {
			display: none;
		}
	` : ''};
	${props => props.hideOnMobile ? `
		display: none;
		@media ${device.laptop} {
			display: block;
		}
	` : ''};
`

export const NavCenter = styled.ul<{ user: IUser | null }>`
	display: flex;
	flex-direction: column;
	margin: 0;
	padding:0;
	text-transform: uppercase;
	
	li{
		list-style: none;
		font-family: 'Fira Sans', sans-serif;
		font-weight: 700;
		padding: 15px 0 15px 30px;
		
		
		${props => !props.user ? `
		&:first-child{
			padding-top: 30px;
		}
		` : ``};
	}
	
	.accountTop{
	 	background: #628AAA;
	 	padding: 25px 0 25px 30px;
	 	margin: 0 0 10px;
	}
	
	@media ${device.laptop}{
		align-items: center;
		justify-content: space-around;
		flex-direction: row;
		margin: 0;
		padding: 0;
		
		li{
			padding:0;
			opacity: 1 !important;
			transform: translateX(0) !important;
			font-size: 14px;
			&:first-child{
				padding-top: 0;
			}
		}

	}
`
export const NavRight = styled.div`
	flex-direction: column;
	
	@media ${device.laptop} {
		align-items: center;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
	}
`
export const LoginStatus = styled.ul`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	padding: 0 30px 20px;
	margin: 0;

	li{
		list-style: none;
		padding: 0 0 15px;
	}
	
	//.signOut{
	//	padding: 15px 0 0;
	//	font-size: 16px;
	//	font-weight: 700;
	//	margin: 0;
	//	color: #fff;
	//	text-transform: uppercase;
	//}
	
	@media ${device.laptop} {
		align-items: center;
		flex-direction: row;
		padding: 0;
		border-right: 1px solid ${colors.grey.i600};
		li{
			opacity: 1 !important;
			transform: translateX(0) !important;
			padding: 0;
		}
		// .signOut{
		// 	padding: 0;
		// 	color: ${colors.primary.text};
		// }
	}
		
`
export const JoinButton = styled(ButtonSmall)`
	margin: 0 15px 0 0;
	font-size: 16px;
	font-weight: 700;
	padding: 10px 25px;
	
	@media ${device.laptop} {
	    font-size: 14px;
	    padding: 8px 20px;
	}
		
`
export const SignInButton = styled(ButtonSmall)`
	padding: 15px 0;
	margin: 0 20px 0 0;
	font-size: 16px;
	color: #fff;
	font-weight: 700;
	
	&:hover{
		color: #fff;
	}
	
	@media ${device.laptop} {
		&:hover{
			color: ${colors.purple.i600};
		}
		font-size: 14px;
		color: ${colors.purple.i500};
	}
`
export const MyAccount = styled.div`
	margin: 0;
	img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0 10px 0 0;
	}
	span{
		text-transform: uppercase;
		font-weight: 600;
		font-size: 16px;
		color: #fff;
	}
	a{
		color: #fff;
		display: flex;
		flex-direction: row;
		align-items: center;
		&:hover{
			cursor: pointer;
		}
	}
	.userSvg__profile{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: transparent;
		justify-content: center;
		align-items: center;
		display: flex;
		margin-right: 10px;
		svg{
			flex: 1;
			max-width: 50px;
			width: 100%;
		}
		path{
			fill: #fff;
		}
	}
	
	@media ${device.laptop} {
		margin: 0 20px 0 0;
		span{
			font-size: 14px;
			color: ${colors.primary.pink};
		}
		a{
			color: ${colors.primary.text};
			font-weight: 500;
		}
		.userSvg__profile{
			path{
				fill: ${colors.primary.pink};
			}
		}
		
	}
		
`
export const SignOutBtn = styled(ButtonSmall)`
	font-size: 16px;
	margin: 15px 0 0 0;
	@media ${device.laptop} {
		font-size: 14px;
		margin: 0 15px 0 0;
		padding: 5px 12px;
	}
		
`
export const CartWrapper = styled(FlexRow)`
	display: none;
	position: relative;
	&:hover{
	cursor: pointer;
	}
	@media ${device.laptop} {
		display: flex;
		padding: 0 15px;
	}
`

export const CartSvg = styled.div`
	width: 36px;
	height: 36px;
	margin-right: 5px;

	svg{
		fill: ${colors.primary.text};
		width: 100%;
	}
	
	@media ${device.laptop} {
		margin-right: 3px;
	}
`
export const CartCount = styled.div`
	color:${colors.primary.pink};
	position: absolute;
	transform: translateY(-50%)translateX(-50%);
	top: 22%;
	left: 75%;

	span{
		font-weight: bold;
	}
`
export const MobileCartWrapper = styled(FlexRow)`
	width: 50px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: relative;
	
	${CartCount}{
		top: 29%;
    left: 72%;
		width: 15px;
    height: 15px;
    display: flex;
    border-radius: 50%;
		background: ${colors.primary.pink};

    span{
    	position: absolute;
    	font-size: 11px;
			color: #fff;
			top: 51%;
			left: 50%;
			transform: translateX(-50%)translateY(-50%);
    }
    
	}
	
	@media ${device.laptop} {
		display: none;
	}
`

export const SignOut = styled.button`
	background: transparent;
	color: #fff;
	outline: none;
	border: none;
	text-transform: uppercase;
	font-weight: 800;
	padding: 15px 0 0;
	
	&:hover{
		cursor: pointer;
	}
	
	&:focus{
		outline: none;
	}
	
	@media ${device.laptop} {
	font-size: 14px;
		padding: 0 20px 0 5px;
		color: ${colors.primary.text};
	}
`
export const UserProfileSvg = styled.span`
		width: 50px;
		height: 50px;
		border-radius: 50%;
		background: transparent;
		justify-content: center;
		align-items: center;
		display: flex;
		margin-right: 10px;
		svg{
			flex: 1;
			max-width: 50px;
			width: 100%;
		}
		path{
			fill: #fff;
		}
		@media ${device.laptop} {
			path{
				fill: ${colors.primary.pink};
			}
		}
`
