import { Actions } from '@et/types/Actions'
import { NavActionTypes } from '@et/types/Enums'

export type INavAction = () => Actions
export const toggleNav = (): Actions => {
	return {
		type: NavActionTypes.TOGGLE_NAV,
	}
}
