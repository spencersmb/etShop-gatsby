import { IState } from '@et/types/State'
import { IUserState } from '@et/types/User'
import { connect } from 'react-redux'

interface IPropsReduxState {
	user: IUserState
}
interface IPropsPublic {
	children: any
}
export const UserHoc = (props: IPropsReduxState & IPropsPublic) => {

	const getStateAndHelpers = (): {user: IUserState} => {
		return {
			user: props.user
		}
	}
	return props.children(getStateAndHelpers())
}
const mapStateToProps = (state: IState): {user: IUserState} => {
	return {
		user: state.user
	}
}
export default connect<IPropsReduxState, {}, IPropsPublic, IState>(mapStateToProps)(UserHoc)