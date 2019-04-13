import { IUserState } from '@et/types/User'
import { CustomWindow } from '@et/types/Winodw'
import React, { ReactNode } from 'react'
import { navigate } from 'gatsby'

declare let window: CustomWindow

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

	if (typeof window === `undefined`) {
		return null
	}

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