import { matchString } from '@utils/genUtils'
import renderer from 'react-test-renderer'
import { cleanup, render } from 'react-testing-library'

afterEach(cleanup)

describe('General Utils', () => {
	it('Should return true or false matching a regex string', () => {
		const matchRegex = matchString('http://siteurl.com/v1/jwt-auth/', 'jwt-auth')
		const matchNoRegex = matchString('http://siteurl.com/v1/wp-json/', 'jwt-auth')
		expect(matchRegex).toEqual(true)
		expect(matchNoRegex).toEqual(false)
	})
})