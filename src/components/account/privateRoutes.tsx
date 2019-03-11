import { IUserState } from '@et/types/User'
import React, { ReactNode } from 'react'
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
	children?: ReactNode
}

const PrivateRoute = (props: IPropsPublic & RouterProps) => {
	const { Component, location, user, ...rest } = props

	if (!location) {
		navigate(`/`)
		return null
	} else if (!user && location.pathname !== `/`) {
		// If the user is not logged in, redirect to the login page.
		navigate(`/`)
		return null
	}
	const innerProps = {
		...rest,
		location,
		user
	}
	return <Component {...innerProps} />
}

export default PrivateRoute