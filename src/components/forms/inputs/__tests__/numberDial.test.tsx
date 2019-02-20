import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup,
	fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import NumberDial from '../numberDial'

afterEach(cleanup)

const props = {
	qty: 2,
	inCart: false,
	inputOnChange: jest.fn(),
	className: 'testClass'
}
describe('Number Dial Test', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<NumberDial {...props}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should render 1 by default props', () => {
		const modalRender = render(<NumberDial {...props}/>)
		const input: any = modalRender.getByTestId('numberDial')
		expect(input.value).toEqual('2')
	})

	it('Should call inputOnChange fn passed to component', () => {
		const modalRender = render(<NumberDial {...props}/>)
		const input = modalRender.getByTestId('numberDial')
		fireEvent.blur(input)
		expect(props.inputOnChange).toHaveBeenCalledTimes(1)
	})

	it('Should only render 3 character length', () => {
		const modalRender = render(<NumberDial {...props}/>)
		const input: any = modalRender.getByTestId('numberDial')
		fireEvent.input(input, { target: { value: '23' } })
		fireEvent.input(input, { target: { value: '2333' } })
		expect(input.value).toBe('23')
	})

	it('Should only render number correctly', () => {
		const modalRender = render(<NumberDial {...props}/>)
		const input: any = modalRender.getByTestId('numberDial')
		fireEvent.input(input, { target: { value: '23' } })
		expect(input.value).toBe('23')
	})

	it('Should only render numbers', () => {
		const modalRender = render(<NumberDial {...props}/>)
		const input: any = modalRender.getByTestId('numberDial')
		fireEvent.input(input, { target: { value: 'abc' } })
		expect(input.value).toBe('')
	})

})