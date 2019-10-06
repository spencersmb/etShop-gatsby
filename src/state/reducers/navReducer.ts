import { Actions } from '@et/types/Actions'
import { NavActionTypes } from '@et/types/Enums'
import { INavState } from '@et/types/Modal'
import initialState from './initialState'

export const navReducer = (state: INavState = initialState.nav, action: Actions): INavState => {
	switch (action.type) {
		case NavActionTypes.TOGGLE_NAV:
			return {
				isOpen: !state.isOpen,
			}
		default:
			return state
	}
}
