import { useSetState } from '@components/account/dashboard'
import { IFontPreviewStyles } from '@et/types/Products'
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
		<div id={'desc'}>
			Font Previewer
			<div>
				<input type='text' onChange={handleTextChange}/>
			</div>
			<div>
				<input type='range' onChange={handleSliderChange} value={state.fontSizeSlider} min='1' max='50' step='1'
							 className='fontSizeSlider'
							 id='myRange'/>
				<span>{state.fontSizeSlider}px</span>
			</div>

			<div>
				<h5>Features</h5>
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
			</div>

			<div>
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
			</div>
		</div>
	)
}
// fontFeatureSettings: `
// 								${state.calt ? '"calt"' : '"calt" 0'},
// 							`

function chooseFontSetting (state: IState): string {
	if (state.calt) {
		return `no-contextual`
	}
	return ''
}

const Font = styled.div<any>`
	font-feature-settings: ${props =>
	`
		${props.state.calt ? '"calt"' : '"calt" 0'},
		${props.state.liga ? '"liga"' : '"liga" 0'},
		${props.state.salt ? '"salt"' : '"salt" 0'}
	
	`
	};
`
export default React.memo(FontPreviewer)
