import { IUserState } from '@et/types/User'
import React from 'react'
import { navigate } from 'gatsby'

interface IPropsPublic {
	Component: any,
	path: string,
	user: IUserState,
}

interface RouterProps {
	location?: {
		pathname: string
	}
}

const PrivateRoute = (props: IPropsPublic & RouterProps) => {
	const { Component, location, user, ...rest } = props
	if (!location) {
		navigate(`/`)
		return null
	} else if (!user && location.pathname !== `/app/login`) {
		// If the user is not logged in, redirect to the login page.
		navigate(`/`)
		return null
	}

	return <Component {...rest} />
}

export default PrivateRoute