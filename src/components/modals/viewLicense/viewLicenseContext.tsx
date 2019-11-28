import { LicenseEnum } from '@et/types/Cart'
import { ILicenseType } from '@et/types/Products'
import React, { useState } from 'react'

export interface IViewLicenseState {
	licenses: ILicenseType[]
	license: LicenseEnum
}

type IMyContext = [IViewLicenseState, any]
const defaultState = {
	licenses: [],
	license: LicenseEnum.standard
}
const LicenseContext = React.createContext<IMyContext>([defaultState, () => {}])
const LicenseProvider = (props: any) => {

	const [state, setState] = useState({
		licenses: props.initialState.licenses,
		license: props.initialState.selectedLicense
	})
	return (
		<LicenseContext.Provider value={[state, setState]}>
			{props.children}
		</LicenseContext.Provider>
	)
}

export { LicenseContext, LicenseProvider }
