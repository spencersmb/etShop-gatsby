import LicenseCard from '@components/cards/licenseCard'
import { IProductBullet, IProductLicenseType } from '@et/types/Products'
import { IShowModalAction } from '@redux/actions/modalActions'
import { calcBulkPriceDiscount } from '@utils/priceUtils'
import React, { SyntheticEvent } from 'react'
import styled from 'styled-components'

interface IProps {
	standardLicPrice: string,
	extendedLicPrice?: string,
	license: IProductLicenseType
	onChange: any,
	selectedLicense: string,
	inCart?: boolean
	showModal: IShowModalAction,
	bulkDiscount: boolean
	licenceQty: number
}

const ProductSelect = (
	{ standardLicPrice, extendedLicPrice, onChange, selectedLicense, inCart, license, showModal, bulkDiscount, licenceQty }: IProps) => {

	// console.log('license', license)

	function handleLicClick (e: SyntheticEvent) {
		e.preventDefault()

		if (e.currentTarget) {
			onChange(e.currentTarget.getAttribute('data-lic'))
		}

	}

	function triggerViewLicense (e: any) {
		e.preventDefault()
		showModal({
			modal: () => (<div>License</div>),
			options: {
				closeModal: true,
				hasBackground: true,
				data: {
					test: 'spencer'
				}
			}
		})
	}

	if (license.hasExtendedLicense) {
		return (
			<LicenseCardWrapper data-testid='wrapper'>

				{/*standard lic*/}
				<LicenseCard
					inCart={inCart || false}
					isSelected={selectedLicense === 'standard'}
					price={calcBulkPriceDiscount(bulkDiscount, standardLicPrice, licenceQty)}
					type='standard'
					title='Standard License'
					desc={license.standardItem.desc}
					// bullets={license.standardItem.bullets}
					handleViewLicense={triggerViewLicense}
					handleLicenseClick={handleLicClick}
				/>

				{/*extended lic*/}
				{extendedLicPrice &&
        <LicenseCard
          inCart={inCart || false}
          isSelected={selectedLicense === 'extended'}
          price={calcBulkPriceDiscount(bulkDiscount, extendedLicPrice, licenceQty)}
          type='extended'
          title='Extended License'
          desc={license.standardItem.desc}
					// bullets={license.extendedItem.bullets}
          handleViewLicense={triggerViewLicense}
          handleLicenseClick={handleLicClick}
        />}

			</LicenseCardWrapper>
		)
	}

	return (
		<LicenseCardWrapper data-testid='wrapper'>
			{/*standard lic*/}
			<LicenseCard
				inCart={inCart || false}
				isSelected={selectedLicense === 'standard'}
				price={calcBulkPriceDiscount(bulkDiscount, standardLicPrice, licenceQty)}
				type='standard'
				title='Standard License'
				desc={license.standardItem.desc}
				handleViewLicense={triggerViewLicense}
				handleLicenseClick={handleLicClick}
			/>
		</LicenseCardWrapper>
	)

}

const LicenseCardWrapper = styled.div`
	margin-bottom: 15px;
	width: 100%;
`

export default ProductSelect
