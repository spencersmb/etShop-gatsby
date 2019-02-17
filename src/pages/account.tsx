import PrivateRoute from '@components/privateRoutes'
import { IUserState } from '@et/types/User'
import React from 'react'
import { Router } from '@reach/router'
import Layout from '@components/layout'
import Profile from '@components/profile'
import UserHoc from '@components/user/userHoc'

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