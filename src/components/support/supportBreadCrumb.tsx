import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	title: string
}

const SupportBreadCrumb = (props: IProps) => {
	const { title } = props
	return (
		<BreadCrumbContainer className={`breadcrumb`} data-testid={'breadcrumb'}>
			<div>
				<Link to={'/'}>
					Home
				</Link>
			</div>
			<div className={`divider`}>/</div>
			<div>
				<Link to={'/support'}>
					Support
				</Link>
			</div>
			<div className={`divider`}>/</div>
			<div data-testid={'title'}>
				{title}
			</div>
		</BreadCrumbContainer>
	)
}
const BreadCrumbContainer = styled.div`
	display: flex;
	flex-direction: row;
	text-transform: uppercase;
	font-size: 14px;
	color: ${colors.pink.i600};
	justify-content: center;
	flex-wrap: wrap;
	margin-bottom: 15px;
	align-items: flex-start;
	
	.divider{
		margin: 0 5px;
	}
	a{
		color: ${colors.pink.i600};
		&:hover{
			color: ${colors.pink.i700};
		}
	}
	
	&:last-child{
    flex: 1 100%;
    width: 100%;
	}
	
	@media ${device.tablet} {
		justify-content: center;
	}
	@media ${device.laptop} {
		justify-content: flex-start;
	}
		
`
export default SupportBreadCrumb
