import PrivateRoute from '@components/account/privateRoutes'
import { IUserState } from '@et/types/User'
import React from 'react'
import { Router } from '@reach/router'
import Layout from '@components/layout'
import Profile from '@components/account/profile'
import UserHoc from '@components/account/userHoc'

const Account = () => (
	<Layout>
		<UserHoc>
			{({ user }: { user: IUserState }) => (
				<Router>
					<PrivateRoute Component={Profile} path='/account/profile' user={user}/>
					{/*<Profile path='/app/profile'/>*/}
				</Router>
			)}
		</UserHoc>
	</Layout>
)

export default Account