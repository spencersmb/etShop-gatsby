import { CouponInput } from '@components/forms/inputs/couponInput'
import initialState from '@redux/reducers/initialState'
import React from 'react'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup,
	fireEvent
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

const propsDefault = {
	checkCoupon: jest.fn(),
	coupon: initialState.cart.coupon
}
const propsValid = {
	checkCoupon: jest.fn(),
	coupon: {
		code: 'test-valid',
		discount: '33.00',
		loading: false,
		product_ids: [24],
		submitted: true,
		type: 'fixed-cart',
		valid: true
	}
}
const propsInvalid = {
	checkCoupon: jest.fn(),
	coupon: {
		code: '',
		discount: '',
		loading: false,
		product_ids: [],
		submitted: true,
		type: '',
		valid: false
	}
}
const propsLoading = {
	checkCoupon: jest.fn(),
	coupon: {
		code: '',
		discount: '',
		loading: true,
		product_ids: [],
		submitted: false,
		type: '',
		valid: false
	}
}
describe('Coupon Input', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<CouponInput {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should display valid notice', () => {
		const modalRender = render(<CouponInput {...propsValid}/>)
		const notice = modalRender.getByTestId('valid-notice')
		expect(notice.innerHTML).toBe('Valid code!')
	})

	it('Should display valid code text', () => {
		const modalRender = render(<CouponInput {...propsValid}/>)
		const input: any = modalRender.getByTestId('couponInput')
		expect(input.value).toBe(propsValid.coupon.code)
	})

	it('Should display invalid notice', () => {
		const modalRender = render(<CouponInput {...propsInvalid}/>)
		const notice = modalRender.getByTestId('invalid-notice')
		expect(notice.innerHTML).toBe('Invalid code!')
	})

	it('Should not call api if input is blank', () => {
		const modalRender = render(<CouponInput {...propsDefault}/>)
		const btn = modalRender.getByTestId('couponSubmitBtn')
		btn.click()
		expect(propsDefault.checkCoupon).toHaveBeenCalledTimes(0)
	})

	it('Should call api when code is entered', () => {
		const modalRender = render(<CouponInput {...propsDefault}/>)
		const input = modalRender.getByTestId('couponInput')
		fireEvent.input(input, { target: { value: 'test' } })
		const btn = modalRender.getByTestId('couponSubmitBtn')
		btn.click()
		expect(propsDefault.checkCoupon).toHaveBeenCalledTimes(1)
	})

	it('Should show btn text Checking...', () => {
		const modalRender = render(<CouponInput {...propsLoading}/>)
		const btn = modalRender.getByTestId('couponSubmitBtn')
		expect(btn.innerHTML).toBe('Checking...')
	})

})