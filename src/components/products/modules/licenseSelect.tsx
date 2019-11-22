import { ILicenseType } from '@et/types/Products'
import { calcBulkPriceDiscount, displayCurrency } from '@utils/priceUtils'
import React from 'react'
interface IProps {
	licenses: ILicenseType[],
	bulkDiscount: boolean,
	licenceQty: number,
	onChange: ({license, slug}:{license: string, slug: string}) => void
}
const LicenseSelect = (props: IProps) => {
	const {licenses, onChange, bulkDiscount, licenceQty} = props

	const handleClick = (index: number) => (e: any) => {
		onChange({
			license: licenses[index].type.value,
			slug: licenses[index].item.slug
		})
	}

	return (
		<div>
			<ul>
				{licenses && licenses.map((license: any, i: number) => (
					<li key={license.type.name} onClick={handleClick(i)}>
						<span>{license.type.name}</span>
						<span>{displayCurrency(calcBulkPriceDiscount(bulkDiscount, license.item.price, licenceQty)).substring(1)}</span>
					</li>
				))}
			</ul>
		</div>
	)
}
export default LicenseSelect
