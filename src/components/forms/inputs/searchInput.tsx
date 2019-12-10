import { IReceipt } from '@et/types/WC_Order'
import { colors } from '@styles/global/colors'
import { Pill, PillPose, SearchInputSpinner } from '@styles/modules/searchInputPill'
import { svgs } from '@svg'
import { renderSvg } from '@utils/styleUtils'
import React, { useState } from 'react'
import { PoseGroup } from 'react-pose'

interface IProps {
	state: {
		searching: boolean,
		selectedSearchOrder: IReceipt | null,
		searchInput: string
	}
	handleSubmit: any
	handleState: any
}

const SearchInput = (props: IProps) => {
	const { state, handleState } = props

	async function submit (e: any) {
		e.preventDefault()
		await props.handleSubmit(state.searchInput)
	}

	function handleChange (e: any) {
		handleState({
			searchInput: e.target.value
		})
	}

	function clearSearch () {
		handleState({
			selectedSearchOrder: null,
			searchInput: ''
		})
	}

	return (
		<form onSubmit={submit}>
			<div className={`search__wrapper`}>
				<input
					className={!!props.state.selectedSearchOrder ? 'searchInput__selected' : ''}
					type='text'
					placeholder={`Search by Order Number`}
					onChange={handleChange}
					value={state.searchInput}
					disabled={state.searching || !!props.state.selectedSearchOrder}
				/>
				<PoseGroup>
					{!!props.state.selectedSearchOrder &&
          <PillPose key={'pill'}>
            <Pill>
							{props.state.selectedSearchOrder.id}
              <span onClick={clearSearch}>{renderSvg(svgs.HamburgerClose)}</span>
            </Pill>
          </PillPose>
					}
				</PoseGroup>

				{state.searching &&
        <SearchInputSpinner submitting={state.searching} spinnerColor={colors.db.primary} data-testid='spinner'
                            className='submit__spinner'>
          <svg className='spinner' viewBox='0 0 50 50'>
            <circle className='path' cx='25' cy='25' r='20' fill='none' strokeWidth='6'/>
          </svg>
        </SearchInputSpinner>}
			</div>
		</form>
	)
}

export default SearchInput
