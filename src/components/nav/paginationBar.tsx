import { Link } from 'gatsby'
import React from 'react'

interface IProps {
	currentPage: number,
	total: number
}

const PaginationBar = (props: IProps) => {
	const { currentPage, total } = props
	return (
		<div data-testid='paginationBar'>
			<div>
				{currentPage !== 1 && <Link
          to={`/account/?page=${currentPage - 1}`}>Prev</Link>}
			</div>
			<div>
				page {currentPage < total ? currentPage : total} out of {total}
			</div>
			<div>
				{currentPage < total && <Link to={`/account/?page=${currentPage + 1}`}>Next</Link>}
			</div>
		</div>
	)
}

export default React.memo(PaginationBar)