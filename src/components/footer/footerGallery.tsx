import FooterForm from '@components/footer/footerForm'
import GatsbyImgMedium from '@components/images/gatsbyImgMedium'
import { device } from '@styles/global/breakpoints'
import { colors } from '@styles/global/colors'
import { Sentinel } from '@styles/global/fonts'
import React from 'react'
import styled from 'styled-components'

interface IFooterGridItem {
	size: string,
	image: {
		name: string,
		alt: string
	},
	procreate?: {
		location: string
	}
}

interface IFooterGridCol {
	items: IFooterGridItem[]
}

const footerGalleryCol = [
	// col 1
	{
		items: [
			{
				size: 'medium-large',
				image: {
					name: 'watercolor-texture-medium-large.jpg',
					alt: 'Freebie: Watercolor Textures'
				}
			}
		]
	},
	// col 2
	{
		items: [
			{
				size: 'small',
				image: {
					name: 'watercolor-florals-small.jpg',
					alt: 'Freebie: Watercolor Florals'
				}
			},
			{
				size: 'small',
				image: {
					name: 'style-inspiration-small.jpg',
					alt: 'Freebie: Hand Drawn Style inspiration guide'
				}
			}
		]
	},
	// col 3
	{
		items: [
			{
				size: 'medium-large',
				procreate: {
					location: 'bottom-left'
				},
				image: {
					name: 'mono-weight-brush-medium-large.jpg',
					alt: 'Freebie: Procreate'
				}
			},
			{
				size: 'default',
				image: {
					name: 'feathers-medium-large.jpg',
					alt: 'Freebie: Vector Feathers'
				}
			}
		]
	},
	// col 4
	{
		items: [
			{
				size: 'default',
				image: {
					name: 'corner-bakery-default.jpg',
					alt: 'Freebie: Corner Bakery Font'
				}
			},
			{
				size: 'small',
				image: {
					name: 'mini-grit-small.jpg',
					alt: 'Freebie: Mini Grit Textures'
				}
			}
		]
	},
	// col 5
	{
		items: [
			{
				size: 'medium',
				procreate: {
					location: 'top-right'
				},
				image: {
					name: 'fuzzy-procreate-brush-small.jpg',
					alt: 'Freebie: Procreate Brush'
				}
			},
			{
				size: 'default',
				image: {
					name: 'border-frames-small.jpg',
					alt: 'Freebie: Border Frames'
				}
			}
		]
	},
	// col 6
	{
		items: [
			{
				size: 'medium-large',
				image: {
					name: 'b-day-tags-medium-large.jpg',
					alt: 'Freebie: Birthday Tags'
				}
			},
			{
				size: 'default',
				image: {
					name: 'ink-texture-pattern-medium.jpg',
					alt: 'Freebie: Ink Texture Patterns'
				}
			}
		]
	},
	// col 7
	{
		items: [
			{
				size: 'default',
				image: {
					name: 'lettering-guides-default.jpg',
					alt: 'Freebie: Lettering Guides'
				}
			},
			{
				size: 'large',
				image: {
					name: 'birthday-card-large.jpg',
					alt: 'Freebie: Birthday Card'
				}
			}
		]
	},
	// col 8
	{
		items: [
			{
				size: 'medium-large',
				image: {
					name: 'ink-texture-medium-large.jpg',
					alt: 'Freebie: Ink Texture Kit'
				}
			},
			{
				size: 'default',
				image: {
					name: 'shirt-mockup-medium-large.jpg',
					alt: 'Freebie: Shirt Mock Up'
				}
			}
		]
	},
	// col 9
	{
		items: [
			{
				size: 'small',
				image: {
					name: 'todo-list-small.jpg',
					alt: 'Freebie: Todo List'
				}
			},
			{
				size: 'small',
				image: {
					name: 'bullet-journal-small.jpg',
					alt: 'Freebie: Bullet Journal Kit'
				}
			}
		]
	},
	// col 10
	{
		items: [
			{
				size: 'small',
				image: {
					name: 'numbers-medium-large.jpg',
					alt: 'Freebie: Hand Drawn Dividers'
				}
			}
		]
	}
]
const FooterGallery = () => {
	return (
		<TTFooterWrapper className={'tt-footer'}>
			<div className='tt-footer__header'>
				<div className='tt-footer__info'>
					<h1>
						Grab 50+ Design and Lettering Files!
					</h1>
					<p className='tt-footer__info sub-text'>
						When you join the Tuesday Tribe, you’ll receive special offers on courses + products and gain access to
						the Resource Library, stocked with over 50 design and lettering files!
					</p>
				</div>
				<FooterForm/>
			</div>
			<div className='tt-footerGrid__wrapper'>
				<div className='tt-footerGrid'>
					{footerGalleryCol.map((col: IFooterGridCol, index: number) => (
						<div key={index} className={'tt-footerGrid__items col'}>
							{col.items.map((item: IFooterGridItem) => {
								return (
									<div key={item.image.name} className={`tt-grid-item ${item.size === 'default' ? '' : item.size}`}>
										{item.procreate && <span className={`tt-procreateGrid-icon ${item.procreate.location}`}>
										{<GatsbyImgMedium imgName={`footer/procreate-icon.jpg`} altTag='Freebie: Procreate'/>}
                    </span>}
										<GatsbyImgMedium imgName={`footer/${item.image.name}`} altTag={item.image.alt}/>
									</div>
								)
							})}
						</div>
					))}
				</div>
			</div>
		</TTFooterWrapper>
	)
}

export default FooterGallery

const TTFooterWrapper = styled.div`
	position: relative;
	z-index: 2;
	display: flex;
  flex-direction: column;
  margin-top: 45px;
  
  .tt-footer__header{
		text-align: center;
		margin: 0 auto 40px;
		padding: 0 20px;
		color: ${colors.primary.headline};
		
		 h1{
		 		${Sentinel.semiboldItalic};
		 		color: ${colors.primary.headline};
        font-size: 21px;
        line-height: 38px;
        margin: 0 auto 0;
        max-width: 600px;
        font-style: normal;
        font-weight: 400;
					@media ${device.tablet} {
						font-size: 36px;
						line-height: 65px;
					}
      }
     .sub-text{
        margin: 0 auto 20px;
        max-width: 700px;
        @media ${device.tablet} {
          margin: 0 auto 40px;
        }

      }
	
		.tt-purple{
			flex: 1;
			@media ${device.tablet} {
				margin: 0 20px 0 0;
			}
		}
	}
  
  .tt-footerGrid{
  	display: grid;
		grid-template-columns: repeat(10, minmax(auto, 1fr));
		grid-gap: 20px;
		width: 2010px;
		position: absolute;
		top:-90px;
		left:50%;
		transform: translateX(-50%) scale(.7);
		
		@media ${device.tablet} {
			width: 2010px;
			top:-80px;
		}
		
		@media ${device.laptop} {
			width: 2010px;
			top:0;
			transform: translateX(-50%) scale(1);
		}
		
		&__wrapper{
			position: relative;
			height: 350px;
			overflow: hidden;
			
			@media ${device.tablet} {
					height: 375px;
			}			
			
			@media ${device.laptop} {
					height: 504px;
			}
		}
		
		&__items{
			position: relative;
			&:nth-child(1){
				margin-top: 164px;
			}
			&:nth-child(3){
				margin-top: 34px;
			}
			&:nth-child(4){
				margin-top: 150px;
			}
			&:nth-child(5){
				margin-top: 20px;
			}
			&:nth-child(6){
				margin-top: 74px;
			}
			&:nth-child(8){
				margin-top: 40px;
			}
			&:nth-child(10){
				margin-top: 164px;
			}
			
			@media ${device.laptop} {
				&:nth-child(4){
					margin-top: 100px;
				}
			}
		}
		
		.tt-grid-item{
			width: 100%;
			height: 128px;
			margin-bottom: 20px;
			//background: teal;
			border-radius: 15px;
			overflow: hidden;
			display: flex;
			flex-direction: column;
			justify-content: center;
			position: relative;
			max-width: 183px;
		
			img{
				width: 100%;
			}
		
			&.small{
				height: 235px;
			}
			&.medium{
				height: 240px;
			}
			&.medium-large{
				height: 280px;
			}
			&.large{
				height: 320px;
			}
			&.x-large{
				height: 340px;
			}
		}
		
		.tt-procreateGrid-icon{
			position: absolute;
			top: 10px;
			left: 10px;
			width: 40px;
			height: 40px;
			z-index: 1;
			border-radius: 10px;
			overflow: hidden;
			
			&.top-right{
				left: auto;
				right: 10px;
			}
			&.bottom-left{
				top: auto;
				bottom: 10px;
			}
			&.bottom-right{
				left: auto;
				top: auto;
				right: 10px;
				bottom: 10px;
			}
		}
		

  }
`
