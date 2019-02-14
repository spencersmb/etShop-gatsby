import { FormState } from 'redux-form'

export interface IReduxForm {
	[formName: string]: FormState;
}