import { IReceipt } from '@et/types/WC_Order'
import React, { useState } from 'react'

interface IProps {
	state: {
		searching: boolean,
		selectedSearchOrder: IReceipt | null,
	}
	handleSubmit: any
	handleState: any
}

const SearchInput = (props: IProps) => {
	const [input, setInput] = useState('')

	async function submit (e: any) {
		e.preventDefault()
		await props.handleSubmit(input)
	}

	function handleChange (e: any) {
		setInput(e.target.value)
	}

	function clearSearch () {
		props.handleState({
			selectedSearchOrder: null
		})
	}

	return (
		<form onSubmit={submit}>
			<div>
				<input type='text' placeholder={`Search by Order Number`} onChange={handleChange}/>
				{props.state.selectedSearchOrder && <div>Result Item Pill:
          <div>
						{props.state.selectedSearchOrder.id}
          </div>
          <div>
            <button onClick={clearSearch}>Clear Search</button>
          </div>
        </div>}
				{props.state.searching && <div>Searching...</div>}
			</div>
		</form>
	)
}

export default SearchInput
