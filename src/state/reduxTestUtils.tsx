// this is a handy function that I normally make available for all my tests
import React from 'react'
import initialState from '@redux/reducers/initialState'
import { Provider } from 'react-redux'
import { render } from 'react-testing-library'
// that deal with connected components.
// you can provide initialState or the entire store that the ui is rendered with
import { createStore } from 'redux'

export function renderWithRedux(
	ui: any,
	reducer: any,
	{ state, store = createStore(reducer, state) }: any = initialState
) {
	return {
		...render(<Provider store={store}>{ui}</Provider>),
		// adding `store` to the returned utilities to allow us
		// to reference it in our tests (just try to avoid using
		// this to test implementation details).
		store,
	}
}