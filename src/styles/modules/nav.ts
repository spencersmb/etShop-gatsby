import { device } from '@styles/global/breakpoints'
import { ButtonSmall } from '@styles/global/buttons'
import { colors } from '@styles/global/colors'
import { FlexRow } from '@styles/global/cssGrid'
import styled from 'styled-components'

interface INavLinkProps {
	isOpen: boolean
}

export const Nav = styled.nav`
	padding: 10px 0 0;
	background: white;
	margin: 0 15px;
	height: 65px;
	width: 100%;
	display: grid;
	grid-template-columns: minmax(50px,1fr) minmax(50px,auto);
	
	@media ${device.laptop} {
		grid-template-columns: repeat(3,minmax(auto,1fr));
		position: relative;
		height: 87px;
	}
`
export const Hamburger = styled.div`
	display: block;
	background: purple;
	width: 50px;
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
	a{
		display: block;
	}
`
export const LogoContainer = styled.div`
		max-width: 140px;
	@media ${device.laptop}{
		max-width: 234px;
	}
`
export const NavLinks = styled.div<INavLinkProps>`
	grid-column: 1 / -1;
	background: white;
	position: absolute;
	left: 0;
	height: 100vh;
	width: 100%;
	transform: ${props => props.isOpen ? `translateY(0)` : `translateY(-100%)`};
	//transition: .3s cubic-bezier(.17,.67,.14,1.03);
	
	@media ${device.laptop} {
		position: relative;
		grid-column: 2 / -1;
		display: grid;
		grid-template-columns: repeat(2,minmax(auto,1fr));
		height: 100%;
		transform: translateY(0);
		transition: 0s;
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
export const NavCenter = styled.ul`
	display: flex;
	flex-direction: row;
	margin: 0;
	padding: 0;
	text-transform: uppercase;
	
	li{
		list-style: none;
		font-family: 'Fira Sans', sans-serif;
		font-weight: 700;
	}
	
	a{
		color: ${colors.primary.text};
	}
	
	@media ${device.laptop}{
		align-items: center;
		justify-content: space-around;

	}
	
`
export const NavRight = styled.div`
	li{
		list-style: none;
	}
	
	@media ${device.laptop} {
		align-items: center;
		justify-content: flex-end;
		display: flex;
		flex-direction: row;
	}
		
`
export const LoginStatus = styled(FlexRow)`
	border-right: 1px solid ${colors.grey.i600};
	align-items: center;
`
export const JoinButton = styled(ButtonSmall)`
	margin: 0 15px 0 0;
`
export const SignInButton = styled(ButtonSmall)`
	padding: 8px 0;
	margin: 0 20px 0 0;
`
export const MyAccount = styled.div`
	margin: 0 20px 0 0;
	img{
		width: 50px;
		height: 50px;
		border-radius: 50%;
		margin: 0 10px 0 0;
	}
	span{
		text-transform: uppercase;
		font-size: 14px;
	}
	a{
		color: ${colors.primary.text};
		font-weight: 500;
	}
`
export const SignOutBtn = styled(ButtonSmall)`
	padding: 8px 0;
	margin: 0 15px 0 0;
`
export const CartWrapper = styled(FlexRow)`
	&:hover{
	cursor: pointer;
	}
	@media ${device.laptop} {
		padding: 0 15px;
	}
`
export const CartSvg = styled.div`
	width: 26px;
	height: 26px;

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
	position: relative;
	span{
		position: absolute;
		transform: translateY(-50%)translateX(-50%);
		top: 22%;
		left: 50%;
		font-weight: bold;
	}
`