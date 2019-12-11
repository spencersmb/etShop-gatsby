import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import { Link } from 'gatsby'
import React from 'react'
import styled from 'styled-components'

interface IProps {
	currentPage: number,
	total: number
}

const PaginationBar = (props: IProps) => {
	const { currentPage, total } = props
	return (
		<PaginationContainer data-testid='paginationBar'>
			<PaginationText>
				page {currentPage < total ? currentPage : total} of {total}
			</PaginationText>
			{currentPage !== 1 && <PaginationLeft>
        <Link
          to={`/account/?page=${currentPage - 1}`}>Prev</Link>
      </PaginationLeft>
			}
			<PaginationButton>
				{currentPage < total && <Link to={`/account/?page=${currentPage + 1}`}>Next</Link>}
			</PaginationButton>
		</PaginationContainer>
	)
}

export default React.memo(PaginationBar)
const PaginationContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	margin-bottom: 5px;
`
const PaginationText = styled.div`
	${Sentinel.semiboldItalic};
	font-size: 14px;
	color: ${colors.secondary.text};
	margin-right: 15px;
`
const PaginationButton = styled.div`
	${Sentinel.semiboldItalic};
	text-transform: uppercase;
	font-size: 14px;
	
	a{
		color: ${colors.db.primary};
	}
`
const PaginationLeft = styled(PaginationButton)`
	padding: 5px 10px 5px 0;
	margin-right: 10px;
	border-right: 1px solid ${colors.grey.i600};
	
`
