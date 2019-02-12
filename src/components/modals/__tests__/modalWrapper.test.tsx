import React from 'react'
import renderer from 'react-test-renderer'
import {Modal} from '../wrapper'
import {
  render,
} from 'react-testing-library'


const initialProps = {
  hideModalAction: () => null,
  component: null,
  show: false,
  options: {}
}
const ModalComponent = () => (<div data-testid='modal'>Test Modal</div>)
const showModalProps = {
  hideModalAction: () => null,
  component: ModalComponent,
  show: true,
  options:{
    closeOutsideModal: true,
    content: 'content',
    hasBackground: true,
  }
}
describe('Modal Wrapper Layout', () => {

  it('renders correctly', () => {
    const tree = renderer
      .create(<Modal {...initialProps}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })

  it('Should be an empty component', ( ) => {
    const modalRender = render(<Modal {...initialProps}/>)

    const html = `<div></div>`;
    expect(modalRender.baseElement.innerHTML).toEqual(html)
  })

  it('Should render a component and an overlay', ( ) => {
    const {getByTestId, getByText} = render(<Modal {...showModalProps}/>)
    const overLay = getByTestId('overlay')
    expect(getByText('Test Modal').innerHTML).toEqual('Test Modal')
    expect(overLay).toBeTruthy()
  })
})