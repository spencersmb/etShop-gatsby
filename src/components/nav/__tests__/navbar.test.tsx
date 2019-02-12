import React from 'react'
import renderer from 'react-test-renderer'
import Navbar from '../navbar'
import {
  render,
} from 'react-testing-library'

describe('Navbar Layout', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<Navbar />)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
  it('Should have Login and Home buttons', ( ) => {
    const { getByText, getByTestId } = render(<Navbar />)
    const element = getByTestId('navbar')
    // console.log('element', element.children[0].children.length)

    expect(getByText('Home')).toBeDefined()
    
  })
})