import { IViewLicenseState, LicenseContext } from '@components/modals/viewLicense/viewLicenseContext'
import { LicenseEnum } from '@et/types/Cart'
import { useContext } from 'react'

const useLicenseContext = () => {
	const [state, setState] = useContext(LicenseContext)

	function setLicense (type: LicenseEnum) {
		if (state.license !== type) {
			setState((currentState: IViewLicenseState) => ({
				...currentState,
				license: type
			}))
		}
	}

	return {
		selectedLicense: state.license,
		licenses: state.licenses,
		setLicense
	}
}

export default useLicenseContext
