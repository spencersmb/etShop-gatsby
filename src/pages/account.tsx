import PrivateRoute from '@components/account/privateRoutes'
import Layout from '@components/layout'
import Dashboard from '@components/user/dashboard'
import { IUserState } from '@et/types/User'
import React from 'react'
import { Router } from '@reach/router'
import Profile from '@components/account/profile'
import UserHoc from '@components/account/userHoc' // passes user data as prop

const Account = () => (
	<Layout>
		<UserHoc>
			{({ user }: { user: IUserState }) => (
				<Router>
					<PrivateRoute Component={Dashboard} path='/account' user={user}/>
					{/*<PrivateRoute Component={Profile} path='/account' user={user}/>*/}
					{/*<Profile path='/app/profile'/>*/}
				</Router>
			)}
		</UserHoc>
	</Layout>
)

export default Account