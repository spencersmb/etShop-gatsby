import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import initStore from '../createStore'
import initialState from '../../reducers/initialState'

afterEach(cleanup)

describe('Create Store Tests', ()=> {
	it('Should return initialState', () => {
		const store = initStore()
		const state = store.getState()
		expect(state).toEqual(initialState)
	})
})