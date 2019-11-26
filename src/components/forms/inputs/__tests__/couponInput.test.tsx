import { CouponInput } from '@components/forms/inputs/couponInput'
import initialState from '@redux/reducers/initialState'
import { testCartWithItem, testCartWithMultiplesFixedCartCoupon } from '@redux/reduxTestUtils'
import React from 'react'
import rxjs from 'rxjs'
import renderer from 'react-test-renderer'
import {
	render,
	cleanup,
	fireEvent,
	waitForElement
} from 'react-testing-library'
import 'jest-dom/extend-expect'
import { TestScheduler } from 'rxjs/testing'

afterEach(cleanup)

const propsDefault = {
	checkCoupon: jest.fn(),
	loadCoupon: jest.fn(),
	invalidCoupon: jest.fn(),
	submitCoupon: jest.fn(),
	updatePrice: jest.fn(),
	coupon: initialState.cart.coupon,
	total: 12,
	cartItems: initialState.cart.items
}
const propsValid = {
	checkCoupon: jest.fn(),
	loadCoupon: jest.fn(),
	invalidCoupon: jest.fn(),
	submitCoupon: jest.fn(),
	updatePrice: jest.fn(),
	coupon: {
		...testCartWithMultiplesFixedCartCoupon.coupon
	},
	total: 12,
	cartItems: testCartWithMultiplesFixedCartCoupon.items
}
const propsInvalid = {
	checkCoupon: jest.fn(),
	loadCoupon: jest.fn(),
	invalidCoupon: jest.fn(),
	submitCoupon: jest.fn(),
	updatePrice: jest.fn(),
	coupon: {
		code: '',
		discount: '',
		loading: false,
		product_ids: [],
		submitted: true,
		type: '',
		valid: false
	},
	total: 12,
	cartItems: testCartWithItem.items
}
const propsLoading = {
	checkCoupon: jest.fn(),
	loadCoupon: jest.fn(),
	invalidCoupon: jest.fn(),
	submitCoupon: jest.fn(),
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
// const scheduler = new TestScheduler(0);
describe('Coupon Input', () => {

	it('renders correctly', () => {
		const tree = renderer
			.create(
				<CouponInput {...propsDefault}/>
			)
			.toJSON()
		expect(tree).toMatchSnapshot()
	})

	it('Should display valid class', () => {
		const modalRender = render(<CouponInput {...propsValid}/>)
		const notice = modalRender.getByTestId('formGroupTest')
		expect(notice).toHaveClass('valid')
	})

	it('Should display valid code text', () => {
		const modalRender = render(<CouponInput {...propsValid}/>)
		const input: any = modalRender.getByTestId('couponInput')
		expect(input.value).toBe(propsValid.coupon.code)
	})

	it('Should display invalid class', () => {
		const modalRender = render(<CouponInput {...propsInvalid}/>)
		const notice = modalRender.getByTestId('formGroupTest')
		expect(notice).toHaveClass('invalid')
	})

	// xit('Should not call api if input is blank', () => {
	// 	const modalRender = render(<CouponInput {...propsDefault}/>)
	// 	const btn = modalRender.getByTestId('couponSubmitBtn')
	// 	btn.click()
	// 	expect(propsDefault.checkCoupon).toHaveBeenCalledTimes(0)
	// })

	// it('Should call api when code is entered', async () => {
	// 	const scheduler = new TestScheduler(0);
	// 	const modalRender = render(<CouponInput {...propsDefault}/>)
	// 	const input = modalRender.getByTestId('couponInput')
	// 	fireEvent.input(input, { target: { value: 'test-code' } })
	// 	// expect(propsDefault.submitCoupon).toHaveBeenCalledTimes(1)
	// 	const greetingNode: any = await waitForElement(() => modalRender.getByTestId('couponInput'))
	// 	expect(greetingNode.value).toBe('test-code')
	// 	expect(propsDefault.submitCoupon).toHaveBeenCalledTimes(1)
	// })

	// xit('Should show btn text Checking...', () => {
	// 	const modalRender = render(<CouponInput {...propsLoading}/>)
	// 	const btn = modalRender.getByTestId('couponSubmitBtn')
	// 	expect(btn.innerHTML).toBe('Checking...')
	// })

})
