import PrivateRoute from '@components/account/privateRoutes'
import Layout from '@components/layout'
import OrdersList from '@components/user/ordersList'
import { IUserState } from '@et/types/User'
import React from 'react'
import { Router } from '@reach/router'
import Profile from '@components/account/profile'
import UserHoc from '@components/account/userHoc'

const Account = () => (
	<Layout>
		<UserHoc>
			{({ user }: { user: IUserState }) => (
				<Router>
					<PrivateRoute Component={OrdersList} path='/account' user={user}/>
					{/*<PrivateRoute Component={Profile} path='/account' user={user}/>*/}
					{/*<Profile path='/app/profile'/>*/}
				</Router>
			)}
		</UserHoc>
	</Layout>
)

export default Account