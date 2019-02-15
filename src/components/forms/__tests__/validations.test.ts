import ReduxValidation from '@components/forms/validations'
import {
	cleanup
} from 'react-testing-library'
import 'jest-dom/extend-expect'

afterEach(cleanup)

describe('Validation Function Tests', ()=>{
	it('Required should return required string or undefined if has value', ()=>{
		const isRequired = ReduxValidation.required(null)
		const isNotRequired = ReduxValidation.required(123)
		expect(isRequired).toEqual('Required')
		expect(isNotRequired).toEqual(undefined)
	})

	it('maxLength should return a Max Length or undefined', ()=>{
		const max = ReduxValidation.maxLength(5)
		const isMax = max('abscgrrr')
		const isNotMax = max(123)
		expect(isMax).toEqual('Must be 5 characters or less')
		expect(isNotMax).toEqual(undefined)
	})

	it('minLength should return a Min Length or undefined', ()=>{
		const min = ReduxValidation.minLength(5)
		const isMin = min('ab')
		const isNotMin = min(123456)
		expect(isMin).toEqual('Must at least be 5 characters long')
		expect(isNotMin).toEqual(undefined)
	})

	it('email should return Invalid email address or undefined', ()=>{
		const isEmail = ReduxValidation.email('spencer.bigum@gmail.com')
		const isNotEmail = ReduxValidation.email('spencer.bigum')
		expect(isEmail).toEqual(undefined)
		expect(isNotEmail).toEqual('Invalid email address')
	})

	it('should validate a number type', ()=>{
		const isNumber = ReduxValidation.numberCheck(2)
		expect(isNumber).toEqual(undefined)
	})
})