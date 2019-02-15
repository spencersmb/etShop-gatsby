/* tslint:disable: no-empty */
import {shallow} from 'enzyme'
import React from 'react'
import sinon, {SinonStub} from 'sinon'
import RenderField from '@components/forms/inputs/renderField'
import renderer from 'react-test-renderer'
import { svgs } from '@svg'

const addItemSpy: SinonStub = sinon.stub()
const removeItemSpy: SinonStub = sinon.stub()

const setup = () => {
	const input = {
		name: 'inputName',
		onBlur: () => {
		},
		onChange: (el: any) => {
		},
		onDragStart: () => {
		},
		onDrop: () => {
		},
		onFocus: () => {
		},
		value: null
	}
	const meta = {
		active: false,
		asyncValidating: false,
		autofilled: false,
		dirty: false,
		dispatch: () => {
		},
		error: {},
		form: 'form',
		initial: {},
		invalid: false,
		pristine: true,
		submitFailed: false,
		submitting: false,
		touched: false,
		valid: false,
		warning: {}
	}
	return shallow(
		<RenderField
			input={input}
	label='Coupon Code:'
	meta={meta}
	disabled={false}
	placeholder='Enter your coupon code'
	svg={svgs.CreditCard}
	type='text'/>
)
}
const setupValid = () => {
	const input = {
		name: 'inputName',
		onBlur: () => {
		},
		onChange: (el: any) => {
		},
		onDragStart: () => {
		},
		onDrop: () => {
		},
		onFocus: () => {
		},
		value: {}
	}
	const meta = {
		active: true,
		asyncValidating: false,
		autofilled: false,
		dirty: false,
		dispatch: () => {
		},
		error: {},
		form: 'form',
		initial: {},
		invalid: false,
		pristine: true,
		submitFailed: false,
		submitting: false,
		touched: true,
		valid: true,
		warning: {}
	}
	return shallow(
		<RenderField
			input={input}
	label='Coupon Code:'
	meta={meta}
	disabled={false}
	placeholder='Enter your coupon code'
	svg={svgs.CreditCard}
	type='text'/>
)
}
const setupInvalid = () => {
	const input = {
		name: 'inputName',
		onBlur: () => {
		},
		onChange: (el: any) => {
		},
		onDragStart: () => {
		},
		onDrop: () => {
		},
		onFocus: () => {
		},
		value: {}
	}
	const meta = {
		active: false,
		asyncValidating: false,
		autofilled: false,
		dirty: false,
		dispatch: () => {
		},
		error: {},
		form: 'form',
		initial: {},
		invalid: true,
		pristine: true,
		submitFailed: false,
		submitting: false,
		touched: true,
		valid: false,
		warning: {}
	}
	return shallow(
		<RenderField
			input={input}
	label='Coupon Code:'
	meta={meta}
	disabled={false}
	placeholder='Enter your coupon code'
	svg={svgs.CreditCard}
	type='text'/>
)
}

describe('RenderField Component', () => {
		let wrapperShallow: any
		beforeEach(() => {
			wrapperShallow = setup()
		})

		afterEach(() => {
			removeItemSpy.reset()
			addItemSpy.reset()
		})

		it('should correct snapshot', () => {
			const input = {
				name: 'inputName',
				onBlur: () => {
				},
				onChange: (el: any) => {
				},
				onDragStart: () => {
				},
				onDrop: () => {
				},
				onFocus: () => {
				},
				value: {}
			}
			const meta = {
				active: false,
				asyncValidating: false,
				autofilled: false,
				dirty: false,
				dispatch: () => {
				},
				error: {},
				form: 'form',
				initial: {},
				invalid: true,
				pristine: true,
				submitFailed: false,
				submitting: false,
				touched: true,
				valid: false,
				warning: {}
			}
			const component = renderer.create(<RenderField
					input={input}
			label='Coupon Code:'
			meta={meta}
			disabled={false}
			placeholder='Enter your coupon code'
			svg={svgs.CreditCard}
			type='text'/>
		)
			const tree = component.toJSON()
			expect(tree).toMatchSnapshot()
		})

		it('should have one input Element', () => {
			expect(wrapperShallow.find('input').length).toBe(1)
		})

		it('should have one Label Element', () => {
			// had to export this to test
			expect(wrapperShallow.find('.renderLabel').length).toBe(1)
		})

		it('should have label active = false by default', () => {
			const label = wrapperShallow.find('.renderLabel')
			expect(label.props().active).toBe(false)
		})

		it('should have active label when input is active', () => {
			const wrapperInvalid = setupValid()
			const svg: any = wrapperInvalid.find('.renderLabel')
			expect(svg.props().active).toBe(true)
		})

		it('should have correct name and type', () => {
			const inputProps = wrapperShallow.find('input').props()

			expect(inputProps.name).toBe('inputName')
			expect(inputProps.type).toBe('text')
		})

		it('should have correct placeholder', () => {
			const inputProps = wrapperShallow.find('input').props()
			expect(inputProps.placeholder).toBe('Enter your coupon code')
		})

		it('should have one svg element', () => {
			expect(wrapperShallow.find('.renderInputSvg').length).toBe(1)
		})

		xit('should have default SVG color of silver', () => {

			const svg = wrapperShallow.find('.renderInputSvg')
			// expect(svg.props().color).toBe(colors.silver)
			expect(svg.props().children.type).toBe(svgs.CreditCard)
		})

		xit('should have SVG color of red for invalid', () => {
			const wrapperInvalid = setupInvalid()
			const svg = wrapperInvalid.find('.renderInputSvg')
			// expect(svg.props().color).toBe(colors.red)
		})

		xit('should have SVG color of green for valid', () => {
			const wrapperInvalid = setupValid()
			const svg = wrapperInvalid.find('.renderInputSvg')
			// expect(svg.props().color).toBe(colors.green)
		})

	}
)
