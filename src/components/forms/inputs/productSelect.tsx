import { colors } from '@styles/global/colors'
import { SentinelFamily, SentinelMedItl } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	standardLicPrice: string,
	extendedLicPrice: string,
	onChange: any,
	selectedLicense: string,
	showDropdown: boolean
	inCart?: boolean
}

const ProductSelect = (
	{ standardLicPrice, extendedLicPrice, onChange, selectedLicense, showDropdown, inCart }: IProps) => {

	function handleLicClick (e: any) {
		e.preventDefault()
		onChange(e.currentTarget.getAttribute('data-lic'))
	}

	function triggerLic (e: any) {
		e.preventDefault()
		console.log('view license')

	}

	console.log('std selected', selectedLicense === 'standard')

	if (showDropdown) {
		return (
			<LicenseCardWrapper>
				{/*standard lic*/}
				<LicenseCard isSelected={selectedLicense === 'standard'}>
					<div className='licenseCard__Header' onClick={handleLicClick} data-lic='standard'>
						{renderSvg(svgs.CardTop)}
						<div className='licenseCard__HeaderContent'>
							<div className='licenseCard__title'>
								<span>type</span>
								Standard License
							</div>
							<div className='licenseCard__price'>
								<span>$</span>
								{standardLicPrice}
							</div>
						</div>
						<div className='licenseCard__dash'>
							{renderSvg(svgs.DottedLine)}
						</div>
					</div>
					<div className='licenseCard__content'>
						<ul>
							<li>
								<span>{renderSvg(svgs.Checkmark)}</span>
								bullet 1
							</li>
							<li>
								<span>{renderSvg(svgs.Checkmark)}</span>
								bullet 1
							</li>
							<li>
								<span>{renderSvg(svgs.Checkmark)}</span>
								bullet 1
							</li>
						</ul>
						<div className='licenseCard__viewLicBtn' onClick={triggerLic}>
							View license
						</div>
					</div>
				</LicenseCard>

				{/*extended lic*/}
				<LicenseCard isSelected={selectedLicense === 'extended'}>
					<div className='licenseCard__Header' onClick={handleLicClick} data-lic='extended'>
						{renderSvg(svgs.CardTop)}
						<div className='licenseCard__HeaderContent'>
							<div className='licenseCard__title'>
								<span>type</span>
								Extended License
							</div>
							<div className='licenseCard__price'>
								<span>$</span>
								{extendedLicPrice}
							</div>
						</div>
						<div className='licenseCard__dash'>
							{renderSvg(svgs.DottedLine)}
						</div>
					</div>
					<div className='licenseCard__content'>
						<ul>
							<li>
								<span>{renderSvg(svgs.Checkmark)}</span>
								bullet 1
							</li>
							<li>
								<span>{renderSvg(svgs.Checkmark)}</span>
								bullet 1
							</li>
							<li>
								<span>{renderSvg(svgs.Checkmark)}</span>
								bullet 1
							</li>
						</ul>
						<div className='licenseCard__viewLicBtn' onClick={triggerLic}>
							View license
						</div>
					</div>
				</LicenseCard>
				{/*<select*/}
				{/*disabled={inCart}*/}
				{/*data-testid='selectID'*/}
				{/*onChange={onChange}*/}
				{/*value={selectedLicense}>*/}
				{/*<option value='standard'>Standard</option>*/}
				{/*<option value='extended'>Extended</option>*/}
				{/*</select>*/}
			</LicenseCardWrapper>
		)
	}

	return (
		<div onClick={handleLicClick} data-lic='standard'>
			<div>
				Standard License
			</div>
			<div>
				{standardLicPrice}
			</div>
			<ul>
				<li>bullet 1</li>
				<li>bullet 1</li>
				<li>bullet 1</li>
			</ul>
			<div>
				<button>View license</button>
			</div>
		</div>
	)

}

interface ILicenseCard {
	isSelected: boolean;
}

const LicenseCardWrapper = styled.div`
	margin-bottom: 30px;
`
const LicenseCard = styled.div<ILicenseCard>`
	border-top: 4px solid #DFE6ED;
	${shadowStyles.shadow3};
	
	.licenseCard__Header{
		position: relative;
		svg{
			display: block;
		}
	}
	
	.licenseCard__HeaderContent{
		position: absolute;
		top: 15px;
		left: 0;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: baseline;
		padding: 0 30px;
	}	
	
	.licenseCard__title{
		${SentinelMedItl};
		font-weight: 500;
		font-size: 28px;
		color: ${colors.secondary.text};
		position: relative;
		line-height: 28px;
		
		span{
			position: absolute;
			top: -25px;	
			left: 0;
			color: ${colors.secondary.text};
			font-family: Fira, sans-serif;
			font-size: 12px;
			letter-spacing: 3px;
			text-transform: uppercase;
		}
	}
	
	.licenseCard__price{
		${SentinelFamily};
		font-weight: 600;
		font-size: 44px;
		color: ${colors.secondary.text};
		line-height: 44px;
		position: relative;
		
		span{
			position: absolute;
			top: 4px;
			left: -13px;
			font-size: 24px;
			line-height: 24px;
		}
	}
	
	.licenseCard__dash{
    position: absolute;
    bottom: 12px;
    left: 50%;
    width: 100%;
    height: 3px;
    max-width: 465px;
    margin: 0 auto;
    transform: translateX(-50%);
    opacity: .5;
		
		svg{
			width: 100%;
		}
	}
	
	.licenseCard__content{
		background: #fff;
		border-radius: 0 0 15px 15px;
		position: relative;
		padding: 0 0 0 30px;
		ul{
			margin: 0 0 15px;
			padding: 10px 0 0;
			
			li{
				list-style: none;
				position: relative;
				padding-left: 20px;
				margin-bottom: 10px;
				color: ${colors.grey.i800};
				span{
					position: absolute;
					left: 0;
					top: 0;
					width: 12px;
				}
				svg{
					fill: ${colors.grey.i800};
				}
			}
		}
	}
	
	.licenseCard__viewLicBtn{
		position: relative;
		font-size: 14px;
		text-transform: uppercase;
		color: ${colors.teal.i500};
		font-weight: 600;
		padding-bottom: 20px;
		cursor: pointer;
	}
`
export default ProductSelect