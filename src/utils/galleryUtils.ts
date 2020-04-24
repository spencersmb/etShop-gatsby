import { useSetState } from '@utils/stateUtils'
import { useEffect } from 'react'
import debounce from 'lodash/debounce'

interface IState {
	root: HTMLDivElement | null,
	offset: number,
	width: number
}

interface INewState {
	root?: HTMLDivElement | null,
	offset?: number,
	width?: number
}

function childrenBox (root: HTMLDivElement, slideCount?: number) {
	const el = root
	return {
		offset: el.offsetLeft,
		width: slideCount ? el.offsetWidth / slideCount : el.offsetWidth
	}
}

type galleryEffectType = [IState]

/*
 Only load events once we have an EL change instead of null as it loads in null the first time
 */
export function useGalleryResizeEffect<OriginalState> (rootEl: HTMLDivElement | null, slideCount?: number, defaultWidth: number = 83): galleryEffectType {
	const [state, setState] = useSetState<IState, INewState>({
		root: null,
		offset: 0,
		width: defaultWidth
	})
	const adjustCurrentLayout = debounce(() => {

		if (rootEl) {
			setState({
				root: rootEl,
				...childrenBox(rootEl, slideCount)
			})
		}
	}, 250)

	// window resize event on mount
	useEffect(() => {
		if (rootEl) {
			window.addEventListener('resize', adjustCurrentLayout)
		}

		return () => {
			window.removeEventListener('resize', adjustCurrentLayout)
		}

	}, [rootEl])

	// set State on load
	useEffect(() => {
		if (rootEl) {
			setState({
				root: rootEl,
				...childrenBox(rootEl, slideCount)
			})
		}
	}, [rootEl])
	console.log('galleryState', state)

	return [state]
}
