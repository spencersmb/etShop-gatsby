## Enzyme Quick lookups
<hr>
How to's:

<br>
<br>

Removing Files from Ts-linter for styleguidist:
```
"linterOptions": {
  "exclude": [
	"dist/**/*.js",
	"config/**/*.js",
	"coverage/**/*.js",
	"scripts/*.js",
	"node_modules/**/*.ts"
  ]
}
```

<br>
<br>

Look up ShallowRender props of main component:
```bash
wrapperShallow.instance().props
```

<br>
<br>

Test a method on a shallow Rendered Component:
```bash
const instance = wrapperShallow.instance()
jest.spyOn(instance, 'getPriceOfSingleItem')

// force update to make function run again
instance.forceUpdate()

expect(instance.getPriceOfSingleItem).toHaveBeenCalled()
expect(wrapperShallow.find('.jestPrice').text()).toBe('$16')

// Example of returning a value from a method and testing the
// return value of whatever it should be returning
expect(instance.checkItemType()).toBe('extended')
``` 

<br>
<br>

Test a method on a mounted Component:
```bash
let handleLicenseChangeSpy: SinonSpy

const setupMount = () => {
  initialState.products = testProducts
  initialState.cart = testCart

  // must wrap this way to test correctly
  // this.handleLicenseChange = this.handleLicenseChange.bind(this)
  handleLicenseChangeSpy = sinon.spy(CartItem.prototype, 'handleLicenseChange')
  const store = createStore(
    combineReducers(
    {
	breakPoint: breakPointReducer,
	cart: cartReducer,
	products: productsReducer,
	  }), initialState, applyMiddleware(thunkMiddleware))

  return mount(
    <Provider store={store}>
	<CartItemRedux cartSlug='watercolor-texture-kit-vol-1'/>
    </Provider>)
  }
	
//test it
expect(handleLicenseChangeSpy.callCount).toEqual(1)
handleLicenseChangeSpy.restore()
``` 

<br>
<br>
 
Passing in a function to test with a spy:

```bash
import * as sinon from 'sinon'
import {SinonStub} from 'sinon'

const cartToggleSpy: SinonStub = sinon.stub()

afterEach(() => {
  cartToggleSpy.reset()
})

it('should call ToggleCartSpy onClick', () => {
  const btn = wrapperShallow.find('.jestCartToggle')
  btn.simulate('click')
  expect(cartToggleSpy.callCount).toBe(1)
})
``` 

<br>
<br>
 
Shorthand example import for testing with Jest

```bash
import {ReactResizeObserver} from '@et/window/resize/resizeObservable'
``` 

We must first go into the package.json and add the correct pointer to our element.
```json
"moduleNameMapper": {
	"^@et/window(.*)$": "<rootDir>/src/components/window$1"
}
```

Example to ignore console.error warnings in JEST
```bash
const windowSpy = jest.spyOn(console, 'error').mockImplementation(() => undefined)
windowSpy.mockClear()
```
