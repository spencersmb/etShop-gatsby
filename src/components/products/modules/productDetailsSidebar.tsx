import { ISelectProduct } from '@components/products/productLayout'
import { ILicenseType, IProductDetails } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	details: IProductDetails
	fontPreview: boolean,
	isStandardLicense: boolean,
	onChange: ISelectProduct,
	licenses: ILicenseType[]
}

function updatePills (fileTypes: string[], isStandardLicense: boolean) {
	const woffFilteredTypes = fileTypes.filter(type => (type === 'woff' || type === 'woff2'))

	if (woffFilteredTypes.length > 0 && isStandardLicense) {
		return fileTypes.filter(type => (type !== 'woff' && type !== 'woff2'))
	} else {
		return fileTypes
	}
}

function matchAllNumbers (word: string): string | null {
	const pattern = /([0-9]+\.[0-9]+)|([0-9]+)/
	const regex = new RegExp(pattern)
	const result = regex.exec(word)

	if (result) {
		return result[0]
	}

	return null
}

function matchAllLetters (word: string): string | null {
	const pattern = /[A-Za-z]+/
	const regex = new RegExp(pattern)
	const result = regex.exec(word)

	if (result) {
		return result[0]
	}

	return null
}

function createFileSizeResponse (word: string) {
	const numbers = matchAllNumbers(word)
	const ending = matchAllLetters(word)

	if (numbers && ending) {
		return `${numbers}<span>${ending}</span>`
	}

	return ''
}

function getProgramLogo (logo: string) {
	const logoName = logo.toLocaleLowerCase()

	switch (logoName) {
		case 'illustrator':
			return renderSvg(svgs.Illustrator)
		case 'photoshop':
			return renderSvg(svgs.Photoshop)
		case 'indesign':
			return renderSvg(svgs.Indesign)
		case 'procreate':
			return <img src='/logos/procreateLogo.png' alt='Procreate'/>

		default:
			return ''
	}
}

const SideBar = ({
									 details =
										 {
											 file_types: [],
											 file_size: 'none',
											 dpi: '0',
											 programs: []
										 },
									 fontPreview = false,
									 onChange,
									 licenses,
									 isStandardLicense
								 }: IProps) => {
	if (!details) {
		return null
	}
	const { file_types, dpi, file_size, programs } = details
	const updateFileTypes = updatePills(file_types, isStandardLicense)

	function changeLicense () {
		onChange({ license: 'extended', slug: licenses[1].item.slug })
	}

	return (
		<SideBarWrapper>
			<SideBarInner>
				<Icon>{renderSvg(svgs.MagnifyGlass)}</Icon>

				{/*Title*/}
				<Section>
					<Title>DETAILS</Title>
				</Section>

				{/*File Types*/}
				{updateFileTypes.length > 0 &&
        <Section data-testid={'fileTypeSection'}>
          <SectionTitle>FILE TYPES</SectionTitle>
          <FileTypes data-testid={'fileTypes'}>
						{updateFileTypes.map(type => (<Pill key={type}>{type}</Pill>))}
          </FileTypes>

					{/*Check for extend lic if product is a font*/}
					{fontPreview && isStandardLicense && <ExtLicMsg onClick={changeLicense} data-testid={'upgrade'}>
            <p>Web Font? Upgrade to</p>
            <span>Extended License</span>
          </ExtLicMsg>}
        </Section>}

				{/*Resolution/DPI*/}
				<Section>
					<SectionIcon>{renderSvg(svgs.Eye)}</SectionIcon>
					<SectionTitle>RESOLUTION</SectionTitle>
					<SectionText data-testid={'dpi'}>{dpi}<span>dpi</span></SectionText>
				</Section>

				{/*FileSize*/}
				<Section>
					<SectionIcon>{renderSvg(svgs.Download)}</SectionIcon>
					<SectionTitle>File Size</SectionTitle>
					<SectionText data-testid={'fileSize'}
											 dangerouslySetInnerHTML={{ __html: createFileSizeResponse(file_size) }}/>
				</Section>

				{/*Programs*/}
				<Section>
					<SectionIcon>{renderSvg(svgs.Programs)}</SectionIcon>
					<SectionTitle>WORKS WITH</SectionTitle>
					<ProgramList data-testid={'programs'}>
						{programs.map(logo => (<li key={logo}>{getProgramLogo(logo)}</li>))}
					</ProgramList>
				</Section>
			</SideBarInner>

		</SideBarWrapper>
	)
}
const ProgramList = styled.ul`
	display: flex;
	margin:0;
	padding: 0;
	list-style: none;
	align-items: center;
	li{
		width: 28px;
		height: 28px;
		margin-right: 7px;
	}
	svg{
		width: 100%;
	}
	img{
		width: 100%;
	}
`
const ExtLicMsg = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 15px;
	
	p{
		font-size: 14px;
		color: #fff;
		padding: 0;
		line-height: 14px;
		margin: 0 0 5px;
	}
	span{
		font-size: 14px;
		line-height: 14px;
		color: rgb(255, 99, 99);
		font-weight: 600;
		&:hover{
			cursor: pointer;
		}
	}
`
const Pill = styled.div`
	background: ${colors.grey.i600};
	font-size: 14px;
	padding: 3px 20px;
	color: #fff;
	border-radius: 50px;
	margin: 0 10px 10px 0;
	text-transform: uppercase;
	font-weight: 600;
`
const FileTypes = styled.div`
display: flex;
flex-direction: row;
flex-wrap: wrap;
`
const Section = styled.div`
	margin-bottom: 40px;
	&:last-child{
		margin-bottom: 0;
	}
`
const SectionTitle = styled.h6`
	font-size: 14px;
	color: ${colors.grey.i600};
	line-height: 14px;
	font-weight: 400;
	margin-bottom: 10px;
	text-transform: uppercase;
`
const SectionIcon = styled.div`
	width: 24px;
	svg{
		width: 100%;
		
		path{
			fill: ${colors.grey.i600};
		}
	}
`
const SectionText = styled.div`
	color: #fff;
	font-size: 45px;
	line-height: 35px;
	${Sentinel.italic};
	font-style: italic;
	font-weight: 100;
	span{
		text-transform: uppercase;
		font-size: 16px;
		line-height: 16px;
		font-weight: 600;
	}
`
const Title = styled.h3`
	color: #fff;
	${Sentinel.italic};
	font-size: 28px;
	font-weight: 500;
`
const Icon = styled.div`
	position: absolute;
	top: 10px;
	right: 10px;
	width: 82px;
	height: 82px;
	svg{
		width: 100%;
		path{
			fill: ${colors.secondary.text};
		}
	}
`

const SideBarWrapper = styled.aside`
	grid-column: 2 / 4;
	position: relative;
	
	@media ${device.tablet} {
		grid-column: 2 / 14;
	}
	
	@media ${device.laptop} {
		grid-column: 9 / 14;
    grid-row: 1 / span 3;
		display: flex;
		justify-content: flex-end;
	}
	
`

const SideBarInner = styled.div`
	position: relative;
	background: ${colors.grey.i800};
	box-shadow: ${shadowStyles.shadow5};
	display: flex;
	flex-direction: column;
	padding: 50px;
	max-width: 365px;
	width: 100%;
	margin: 0 auto;
	
	@media ${device.laptop} {
		margin: 0;
	}
`

export default SideBar
