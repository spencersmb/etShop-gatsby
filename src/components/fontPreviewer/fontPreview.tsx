import { IFontPreviewStyles } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { GridFluid } from '@styles/global/cssGrid'
import { Sentinel } from '@styles/global/fonts'
import { placeholderColor } from '@styles/global/mixins'
import { shadowStyles } from '@styles/global/shadows'
import { svgs } from '@svg'
import { useSetState } from '@utils/stateUtils'
import { renderSvg } from '@utils/styleUtils'
import { getWidth } from '@utils/windowUtils'
import React from 'react'
import posed from 'react-pose'
import styled, { keyframes } from 'styled-components'
import Slider from 'react-rangeslider'

interface IProps {
	styles: IFontPreviewStyles[]
}

interface IState {
	fontSizeSlider: number,
	customText: string,
	calt: boolean
	liga: boolean
	dlig: boolean
	salt: boolean
	isOpen: boolean
}

interface INewState {
	fontSizeSlider?: number,
	customText?: string,
	calt?: boolean
	liga?: boolean
	dlig?: boolean
	salt?: boolean
	isOpen?: boolean
}

const FontPreviewer = (props: IProps) => {

	const [state, setState] = useSetState<IState, INewState>({
		fontSizeSlider: 25,
		customText: 'When zombies arrive, quickly fax judge Pat',
		calt: false,
		liga: true,
		dlig: false,
		salt: false,
		isOpen: false
	})
	const { customText, fontSizeSlider, isOpen } = state

	function handleSliderChange (value: number) {
		setState({ fontSizeSlider: value })
	}

	function handleTextChange (e: React.ChangeEvent<HTMLInputElement>) {
		setState({ customText: e.target.value })
	}

	const toggleFeatures = (type: string) => () => {
		setState({
			[type]: !state[type]
		})
	}

	function toggleFeaturesBox () {
		setState({
			isOpen: !state.isOpen
		})
	}

	return (
		<Container>

			<FontPreviewControls>
				<Title>Font Previewer</Title>

				{/*Features Container*/}
				<FeaturesContainer>

					{/*Slider*/}
					<SliderControls>
						<SliderContainer data-testid={'slider'}>
							<Slider
								min={12}
								max={50}
								step={1}
								tooltip={false}
								value={state.fontSizeSlider}
								// onChangeStart={this.handleChangeStart}
								onChange={handleSliderChange}
								// onChangeComplete={this.handleChangeComplete}
							/>
						</SliderContainer>
						<span data-testid={'fontSize'}>{state.fontSizeSlider}px</span>
						<FeaturesToggle onClick={toggleFeaturesBox} data-testid={'featuresToggle'}>
							{renderSvg(svgs.Controls)}
						</FeaturesToggle>
					</SliderControls>

					{/*Font Features*/}
					<CheckBoxsContainer
						data-testid={'checkboxContainer'}
						pose={isOpen ? 'open' : 'closed'}
						showShadow={getWidth() >= 1024}
						className={isOpen ? 'open' : 'closed'}
					>
						<CheckBoxInner>
							<h6>Font Features</h6>
							<CheckBox>
								<input
									type='checkbox'
									name='calt'
									aria-label='calt'
									onChange={toggleFeatures('calt')}
									checked={state.calt}/>
								<label onClick={toggleFeatures('calt')} htmlFor='calt'>Contextual Alternates</label>
							</CheckBox>
							<CheckBox>
								<input
									type='checkbox'
									name='liga'
									aria-label='liga'
									onChange={toggleFeatures('liga')}
									checked={state.liga}/>
								<label onClick={toggleFeatures('liga')} htmlFor='liga'>Ligatures</label>
							</CheckBox>
							<CheckBox>
								<input
									type='checkbox'
									name='dlig'
									aria-label='dlig'
									onChange={toggleFeatures('dlig')}
									checked={state.dlig}/>
								<label onClick={toggleFeatures('dlig')} htmlFor='dlig'>Discretionary Ligatures</label>
							</CheckBox>
							<CheckBox>
								<input
									type='checkbox'
									name='salt'
									aria-label='salt'
									onChange={toggleFeatures('salt')}
									checked={state.salt}/>
								<label onClick={toggleFeatures('salt')} htmlFor='salt'>Stylistic Alternates</label>
							</CheckBox>
						</CheckBoxInner>
					</CheckBoxsContainer>
				</FeaturesContainer>

				{/*PREVIEW INPUT*/}
				<PreviewInput>
					<span>Type here to try it out</span>
					<input type='text' onChange={handleTextChange}
								 value={state.customText}/>
				</PreviewInput>

				{/*Font Style Previews*/}
				<Fonts data-testid={'fontsList'}>
					{props.styles.map((item, index) =>
						(<Font
							data-testid={`font-${index}`}
							key={item.font_family}
							state={state}
							style={{
								fontFamily: item.font_family,
								fontStyle: 'inherit',
								fontSize: `${fontSizeSlider}px`
							}}><span>{item.type}</span>{customText}</Font>)
					)}
				</Fonts>
			</FontPreviewControls>

		</Container>
	)
}
const FeaturesToggle = styled.div`
	width: 75px;
	display: flex;
	align-items: center;
	svg{
		width: 100%;
	}
	.controls-lines{
		stroke: #fff;
	}
	.controls-circles{
		stroke: ${colors.grey.i800};
		fill: #fff;
	}
	
		
	@media ${device.tablet} {
		width: 60px;
	}

`
const checkedColor = colors.teal.i500
const radioBorderColor = colors.teal.i500
const radioSize = 20
const radioCheckedSize = 10
const radioRippleSize = `15px`
const ripple = keyframes`
	0% {
	box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.0);
	}
	50% {
	box-shadow: 0px 0px 0px ${radioRippleSize} rgba(252, 252, 252, 0.1);
	}
	100% {
	box-shadow: 0px 0px 0px ${radioRippleSize} rgba(0, 0, 0, 0);
	}
	`

const CheckBoxContainerPose = posed.div({
	closed: {
		height: 0,
		boxShadow: '0px 30px 30px rgba(0,0,0,0)',
		transition: {
			default: { duration: 300, ease: 'easeIn' }
		}
	},
	open: {
		height: 'auto',
		transition: {
			default: {
				duration: 300,
				ease: 'backInOut'
			},
			boxShadow: {
				delay: 300
			}
		},
		boxShadow: (props: any) => props.showShadow ? shadowStyles.shadow3alt : '0px 30px 30px rgba(0,0,0,0)'
	}
})
const CheckBoxsContainer = styled(CheckBoxContainerPose)`
	overflow: hidden;
	
	@media ${device.laptop} {
    position: absolute;
    top: 83px;
    left: auto;
    right: 0;
	}
		
`
const CheckBoxInner = styled.div`
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	background: #576372;
	padding: 30px 30px 20px;
	
	h6{
		color: #fff;
		font-size: 11px;
		margin-bottom: 15px;
		text-transform: uppercase;
		width: 100%;
	}
	@media ${device.tablet} {
		padding: 20px 90px 10px 20px;
	}
	@media ${device.laptop} {
		padding: 30px 50px 20px 30px;
		flex-direction: column;
	}
`
const CheckBox = styled.div`
    input[type="checkbox"] {
        display: none;
        &:checked + label:before {
            border-color: ${checkedColor};
            animation: ${ripple} 0.2s linear forwards;   
        }
        &:checked + label:after {
            transform: scale(1);
        }
    }
    
    label {
        display: inline-block;
        height:${radioSize}px;
        position: relative;
        padding: 0 30px;
        margin-bottom: 15px;
        color: #fff;
        cursor: pointer;
        vertical-align: bottom;
        &:before, &:after {
            position: absolute;            
            content: '';  
            border-radius: 50%;
            transition: all .3s ease;
            transition-property: transform, border-color;
        }
        &:before {
            left: 0;
            top: 0;
            width: ${radioSize}px;
            height: ${radioSize}px;
            border: 2px solid ${radioBorderColor};

        }
        &:after {
            top: ${(radioSize / 2) - (radioCheckedSize / 2)}px;
            left: ${(radioSize / 2) - (radioCheckedSize / 2)}px;
            width:${radioCheckedSize}px;
            height:${radioCheckedSize}px;
            transform: scale(0);
            background:${checkedColor};
        }
    }
    
	@media ${device.tablet} {
		flex: 1 0 50%;
		label{
			padding-right: 0;
			height: auto;
			margin: 0 0 15px;
			font-size: 14px;
		}
	}
`

const SliderContainer = styled.div`
		position: relative;
		width: 100%;
		max-width: 190px;
		
		@media ${device.tablet} {
			max-width: 250px;
		}
`
const Fonts = styled.div`
	padding: 20px;
	grid-column: 1 / -1 ;
	color: ${colors.primary.text};
	background: #fff;
	
	@media ${device.tablet} {
		padding: 20px 30px;
	}
	
`
const Font = styled.div<{ state: IState }>`
	margin: 0 0 25px;
	display: flex;
	flex-direction: column;
	font-feature-settings: ${props =>
	`
		${props.state.calt ? '"calt"' : '"calt" 0'},
		${props.state.liga ? '"liga"' : '"liga" 0'},
		${props.state.dlig ? '"dlig"' : '"dlig" 0'},
		${props.state.salt ? '"salt"' : '"salt" 0'}
	`
};
	span{
		color: #85878b;
		font-size: 16px !important;
		margin-bottom: 8px;
		font-family: "Fira Sans", sans-serif;
	}
`
const SliderControls = styled.div`
	display: flex;
	flex-direction: row;
	padding: 10px 20px;
	position: relative;
	align-items: center;
	justify-content: space-between;

	span{
		font-size: 18px;
		color: #fff;
		margin:0 10px 0 25px;
		${Sentinel.semiboldItalic};
		min-width: 40px;
		flex:1;
	}
	
	@media ${device.tablet} {
		justify-content: flex-start;
		
		span{
			font-size: 24px;
		}
	}
`

const FeaturesContainer = styled.div`
	background: ${colors.grey.i800};
	display: flex;
	flex-direction: column;
	z-index: 3;
`

const PreviewInput = styled.div`
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 1;
	background: ${colors.teal.i500};
	padding: 20px;
	text-align: center;
	span{
		color: ${colors.primary.headline};
		text-transform: uppercase;
		font-weight: 500;
		padding-bottom: 15px;
	}
	input{
		background: transparent;
		color: #fff;
		border: 3px solid #fff;
		border-radius: 50px;
		padding: 0 20px;
		text-align: center;
		font-size: 16px;
		height: 50px;
	  word-wrap: break-word;
    word-break: break-all;
		&:focus{
			outline: none;
		}
		${placeholderColor(`#fff`)}
	}


	@media ${device.tablet} {
			padding: 30px;
			input{
				margin: 0;
				width: 100%;
				font-size: 18px;
				text-align: left;
			}
			span{
				font-size: 14px;
				padding: 0 0 15px;
				text-align: left;
			}
	}
	
	@media ${device.laptop} {
		input{
			font-size: 21px;
			max-width: 600px;
		}
	}
`
const FontPreviewControls = styled.div`
	grid-column: 1 / -1;
	display: flex;
	flex-direction: column;
	position: relative;
	z-index: 1;
	
	@media ${device.tablet} {
			grid-column: 2 /14;
			${shadowStyles.shadow3};
	}
`
const Title = styled.div`
	${Sentinel.semiboldItalic};
	color: ${colors.primary.headline};
	position: absolute;
	left: 0;
	font-size: 28px;
	top: -80px;
	background: #fff;
	width: 70%;
	height: 100px;
	padding: 20px;
	z-index: 0;
	
	@media ${device.tablet} {
		padding-left: 40px;
		left: -30px;
	}
	@media ${device.laptop} {
		width: 45%;
	}
		
`
const containerCssoverride = `
	grid-row-gap: 0 !important;
`
const Container = styled(GridFluid)`
	position: relative;	
	margin-top: 150px;
	padding: 0;
	@supports(display: grid){
		${containerCssoverride}
	}
	
	@media ${device.tablet} {
			padding: 0;
			margin-top: 175px;
	}

		
`
export default React.memo(FontPreviewer)
