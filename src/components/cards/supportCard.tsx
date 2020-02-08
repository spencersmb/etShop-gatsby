import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import { Link } from 'gatsby'
import baseStyled, { ThemeProvider, ThemedStyledInterface } from 'styled-components'

const theme = {
	purple: {
		color: colors.purple.i500
	},
	teal: {
		color: colors.teal.i500
	}
}

interface ICardTheme {
	color: string
}

// type Theme = typeof theme;
const styled = baseStyled as ThemedStyledInterface<ICardTheme>

interface IProps {
	theme: string
	link: string
	title: string
	text: string
	icon: string
}

const SupportCard = (props: IProps) => {
	const { icon, link, title, text } = props
	return (
		<ThemeProvider theme={theme[props.theme]}>
			<CardContainer>
				<Link to={link}>
					<SvgIcon>
						{renderSvg(svgs[icon])}
					</SvgIcon>
					<Content>
						<h2>{title}</h2>
						<p>{text}</p>
					</Content>
				</Link>
			</CardContainer>
		</ThemeProvider>
	)
}
export default SupportCard
const Content = styled.div`
	display: flex;
	flex-direction: column;
	padding: 30px 30px 30px 100px;
	
	h2{
		font-size: 1.4em;
		${Sentinel.semiboldItalic};
		line-height: 28px;
		font-weight: 400;
		margin-bottom: 15px;
		color: ${props => props.theme.color}
	}
	p{
		color: ${colors.grey.i800};
		margin:0;
	}
	
	@media ${device.tablet} {
		padding: 30px 20px 30px 100px;
	}
	
	@media ${device.laptop} {
		padding: 30px 45px 30px 100px;
		h2{
			font-size: 1.6em;
		}
	    
	}
		
		
`
const SvgIcon = styled.div`
 max-width: 98px;
 display: flex;
 flex-direction: column;
 position: absolute;
 top:50%;
 transform: translateY(-50%);
 left: -30px;	
 width: 100%;
 svg{
 	width: 100%;
 }
 
 @media ${device.tablet} {
 	max-width: 98px;
 }
 	
`
const CardContainer = styled.div`
	background: #fff;
	box-shadow: 0 13px 27px -5px rgba(50,50,93,.25), 
							0 8px 16px -8px rgba(0,0,0,.3), 
							0 -6px 16px -6px rgba(0,0,0,.025);
	border-radius: 10px;
	overflow: hidden;
	position: relative;
	margin-bottom: 40px;
	&:last-child{
		margin-bottom: 0;
	}
	
	@media ${device.tablet} {
		margin: 0 15px 40px 0;
		
		&:last-child{
			margin: 0 0 40px 15px;
		}
	}
	
	@media ${device.laptop} {
		transition: all .3s;
		margin: 0 20px 40px 0;
		h2, p {
			transition: .3s;
		}
		path{
			transition: all .3s;
		}
		
		&:last-child{
			margin: 0 0 40px 20px;
		}
		&:hover{
			transform: translateY(-5px);
			box-shadow: 0 30px 60px -12px rgba(50,50,93,.25), 0 18px 36px -18px rgba(0,0,0,.3), 0 -12px 36px -8px rgba(0,0,0,.025);
			
			h2, p{
				color: ${colors.primary.headline};
			}
			
			.svg-primary{
				fill: ${colors.primary.headline};
			}			
			.svg-secondary{
				fill: #6A7E90;
			}
			.svg-third{
				fill: ${colors.grey.i600};
			}	
	}
}
	
	@media ${device.laptopL} {
		margin: 0 20px 40px 0;
		
		&:last-child{
			margin: 0 0 40px 20px;
		}
	    
	}
		
		
		
`
