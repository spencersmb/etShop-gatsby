import SupportLink from '@components/support/supportLink'
import { ICategory } from '@et/types/Support'
import { Link } from 'gatsby'
import React from 'react'

const SupportCategory = (props: ICategory) => {
	const {name, supportQuestions, slug} = props
	return (
		<div >
			{/*HEADER*/}
			<h2>
				{name}
			</h2>

			{/*ITEMS*/}
			<div>
				{supportQuestions.nodes.map((item) => (
					<SupportLink key={item.slug} item={item} showExcerpt={true}/>))}
			</div>

			{/*VIEW MORE*/}
			{supportQuestions.nodes.length > 3 &&
      <div>
        <Link to={`/support/category/${slug}`}>
          View All
        </Link>
      </div>
			}
		</div>
	)
}
export default SupportCategory
