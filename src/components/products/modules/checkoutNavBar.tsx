import { getWindowPosition } from '@utils/windowUtils'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'

interface IProps {
	inView: boolean
}

const CheckoutNavBar = (props: IProps) => {
	const { inView } = props
	return (
		<div style={{
			position: 'fixed',
			bottom: 0,
			width: '100%',
			height: '50px',
			background: '#fff',
			zIndex: 4
		}}>
			NavBar visible: {(getWindowPosition() > 300 && !inView).toString()}
			<div>
				{/*window: {getWindowPosition()}*/}
			</div>
		</div>
	)
}
export default CheckoutNavBar
