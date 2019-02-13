import React from 'react'
import { Field } from 'redux-form'

interface IReduxField {
	name: string;
	type: string;
	component: any;
	placeholder: string;
	label: string;
	disabled?: boolean;
	svg?: any;
	// dirty: boolean;
	// pristine: boolean;
	// value: any;
}

export class ReduxFieldExt extends React.Component<IReduxField>{
	constructor(props: IReduxField) {
		super(props)
	}
	render(){
		return(
			<div>
				<Field {...this.props}/>
			</div>
		)
	}
}

export default ReduxFieldExt