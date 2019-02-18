import React from 'react'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { IUserState } from '../../../types/User'
import { UserHoc } from '../userHoc'

afterEach(cleanup)

const hasUser = {
	user: {
		email: 'spencer.bigum@gmail.com',
		firstName: 'Spencer',
		lastName: 'spencer',
		token: '12345'
	}
}

const Inner = (props: { user: IUserState }) => (
	<>
		{props.user && <div>{props.user.email}</div>}
	</>
)
describe('User Hoc Render Props', () => {

	it('Should render correct user email', () => {
		const modalRender = render(<UserHoc {...hasUser}>
			{({ user }: { user: IUserState }) => {
				return <Inner user={user}/>
			}}
		</UserHoc>)
		expect(modalRender.getByText('spencer.bigum@gmail.com').innerHTML).toEqual('spencer.bigum@gmail.com')
	})

})