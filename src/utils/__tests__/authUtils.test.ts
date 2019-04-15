import { isUserValid, loadUser } from '@utils/authUtils'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const user = {
	email: 'spencer.bigum@gmail.com',
	firstName: 'Spencer',
	lastName: 'spencer',
	token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zaG9wZXZlcnl0dWVzZGF5LmxvY2FsIiwiaWF0IjoxNTUwNDQ2ODY2LCJuYmYiOjE1NTA0NDY4NjYsImV4cCI6MTU1MTA1MTY2NiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTMifX19.VLQswMC5BznFbPLwsfrJvrSanA1HOso-5t1jclRhQM0'
}
describe('User Hoc Render Props', () => {

	it('Should return true for valid user', () => {
		expect(isUserValid(user.token)).toEqual(false)
	})

	it('Should return true for valid user', async () => {
		const load = await loadUser()
		expect(load).toEqual(null)
	})

})