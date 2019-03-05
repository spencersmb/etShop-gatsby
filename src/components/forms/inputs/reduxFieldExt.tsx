import React, { Component, Dispatch, SetStateAction, useEffect } from 'react'
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
	setEmailTaken?: (state: SetStateAction<boolean>) => void
	emailTaken?: boolean

	// dirty: boolean;
	// pristine: boolean;
	// value: any;
}

export function ReduxFieldExt (props: IReduxField) {

	return (
		<>
			<Field {...props}/>
		</>
	)
}

export default ReduxFieldExt