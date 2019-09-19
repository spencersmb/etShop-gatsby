import { useSetState } from '@components/account/dashboard'
import { IFontPreviewStyles } from '@et/types/Products'
import { device } from '@styles/global/breakpoints'
import { GridFluid } from '@styles/global/cssGrid'
import React, { EventHandler } from 'react'
import styled from 'styled-components'

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
}

const FontPreviewer = (props: IProps) => {
	console.log('render Font Previewer', props)
	const [state, setState] = useSetState({
		fontSizeSlider: 25,
		customText: 'When zombies arrive, quickly fax judge Pat',
		calt: false,
		liga: true,
		salt: false
	})
	const { customText, fontSizeSlider } = state

	function handleSliderChange (e: React.ChangeEvent<HTMLInputElement>) {
		setState({ fontSizeSlider: e.target.value })
	}

	function handleTextChange (e: React.ChangeEvent<HTMLInputElement>) {
		setState({ customText: e.target.value })
	}

	const toggleFeatures = (type: string) => () => {
		setState({
			[type]: !state[type]
		})
	}

	// 1 .font-variant-ligatures - no-common-ligatures / common-ligatures
	// 2. font-feature-settings: "salt"
	// 3. font-variant: no-contextual
	// 4: watch ss -
	// font-feature-settings: "dlig";
	// font-variant: no-contextual;
	console.log('state', state)

	return (
		<Container id={'desc'}>
			<div>Font Previewer</div>
			{/*PREVIEW INPUT*/}
			<PreviewInput>
				<span>Type here to try it out</span>
				<input type='text' onChange={handleTextChange} placeholder={state.customText}/>
			</PreviewInput>

			{/*Features Container*/}
			<FeaturesContainer>

				{/*Slider*/}
				<div>
					<input type='range' onChange={handleSliderChange} value={state.fontSizeSlider} min='1' max='50' step='1'
								 className='fontSizeSlider'
								 id='myRange'/>
					<span>{state.fontSizeSlider}px</span>
				</div>

				{/*Font Features*/}
				<div>
					<label><input
						type='checkbox'
						name='calt'
						onChange={toggleFeatures('calt')}
						checked={state.calt}/>Contexual
						Alternates</label>
					<label><input
						type='checkbox'
						name='liga'
						onChange={toggleFeatures('liga')}
						checked={state.liga}/>Ligatures</label>
					<label><input
						type='checkbox'
						name='salt'
						onChange={toggleFeatures('salt')}
						checked={state.salt}/>Stylistic Alternates</label>
					<label><input
						type='checkbox'
						name='salt'
						onChange={toggleFeatures('dlig')}
						checked={state.salt}/>Discretionary Ligatures</label>
				</div>
			</FeaturesContainer>

			{/*Font Style Previews*/}
			<Fonts>
				{props.styles.map((item) =>
					(<Font
						key={item.font_family}
						state={state}
						style={{
							fontFamily: item.font_family,
							fontStyle: 'inherit',
							fontSize: `${fontSizeSlider}px`
						}}>{customText}</Font>)
				)}
			</Fonts>
		</Container>
	)
}
const Fonts = styled.div`
	grid-column: 2 / 4 ;
`
const FeaturesContainer = styled.div`
	grid-column: 2 / 4;
`
const Font = styled.div<any>`
	font-feature-settings: ${props =>
	`
		${props.state.calt ? '"calt"' : '"calt" 0'},
		${props.state.liga ? '"liga"' : '"liga" 0'},
		${props.state.dlig ? '"dlig"' : '"dlig" 0'},
		${props.state.salt ? '"salt"' : '"salt" 0'}
	`
	};
`
const PreviewInput = styled.div`
	grid-column: 2 / 4;
	display: flex;
	flex-direction: column;
`
const Container = styled(GridFluid)`
	padding: 0;
	@supports(display: grid){
		@media ${device.tablet} {
			padding: 0;
			grid-gap: 0;
		}
	}

		
`
export default React.memo(FontPreviewer)
