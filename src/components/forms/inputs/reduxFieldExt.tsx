import React, { Component } from 'react'
import { Field, Validator } from 'redux-form'

interface IReduxField {
	name: string;
	type: string;
	component: any;
	placeholder: string;
	label: string;
	disabled?: boolean;
	svg?: any;
	validate?: Validator | Validator[];
	warn?: Validator | Validator[];
	withRef?: boolean;
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
			<>
				<Field {...this.props}/>
			</>
		)
	}
}

export default ReduxFieldExt