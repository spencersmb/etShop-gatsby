import { IUser } from '@et/types/User'
import React from 'react'

interface IProps {
	user: IUser
}

const Profile = (props: IProps) => {

	const { user } = props
	return (
		<>
			<h1>Your profile</h1>
			<ul>
				<li>Name: {user.firstName}</li>
				<li>E-mail: <span>{user.email}</span></li>
			</ul>
		</>
	)
}

export default Profile