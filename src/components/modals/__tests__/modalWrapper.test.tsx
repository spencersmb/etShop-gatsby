import React from 'react'
import renderer from 'react-test-renderer'
import { Modal } from '../wrapper'
import {
	render,
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const initialProps = {
	hideModalAction: () => null,
	component: null,
	show: false,
	cartIsOpen: false,
	options: {}
}
const ModalComponent = (props: any) => (<div data-testid='modal'>
	<div>Test Modal</div>
	<button onClick={props.closeModal} data-testid='closeBtn'>Close</button>
</div>)
const showModalProps = {
	hideModalAction: jest.fn(),
	component: ModalComponent,
	show: true,
	cartIsOpen: true,
	options: {
		closeOutsideModal: true,
		content: 'content',
		hasBackground: true
	}
}
describe('Modal Wrapper Layout', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(<Modal {...initialProps}/>)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should be an empty component', () => {
		const modalRender = render(<Modal {...initialProps}/>)

		const html = `<div></div>`
		expect(modalRender.baseElement.innerHTML).toEqual(html)
	})

	it('Should render a component and an overlay', () => {
		const { getByTestId, getByText } = render(<Modal {...showModalProps}/>)
		const overLay = getByTestId('overlay')
		expect(getByText('Test Modal').innerHTML).toEqual('Test Modal')
		expect(overLay).toBeTruthy()
	})

	it('Should call hideModalAction on click', async () => {
		const { getByTestId } = render(<Modal {...showModalProps}/>)
		getByTestId('closeBtn').click()
		expect(showModalProps.hideModalAction).toHaveBeenCalledTimes(1)
	})
})
