import { Dispatch as ReactDispatch, useReducer } from 'react'

interface IPublicState {
	selectedFilter: string
}

interface INewState {
	selectedFilter?: string
}

type useSetStateType = [IPublicState, ReactDispatch<INewState>]

export function useSetFilterState (initialState: IPublicState): useSetStateType {
	const [state, setState] = useReducer((originalState: IPublicState, newState: INewState) => ({ ...originalState, ...newState }),
		initialState)

	return [
		state,
		setState
	]
}