import { device } from '@styles/global/breakpoints'
import { css } from 'styled-components'

export default css`
	.carousel{
		display: flex;
		flex-direction: column;
		position: relative;
				
		.previous, .next{
			display: none;
		}
		
		.flickity-page-dots{
			position: absolute;
			width: 100%;
			bottom: -40px;
			padding: 0;
			margin: 0;
			list-style: none;
			text-align: center;
			line-height: 1;
			.dot{
				display: inline-block;
				width: 10px;
				height: 10px;
				margin: 0 8px;
				background: #333;
				border-radius: 50%;
				opacity: 0.25;
				cursor: pointer;
				
				&.is-selected{
					opacity: 1;
				}
			}
		}
		
	}
	.carousel.is-fullscreen .carousel-cell {
		height: 100%;
	}
	.flickity-viewport{
	overflow: hidden;
		//max-height: 525px;
		width: 100%;
	}
	.flickity-enabled{
		outline: none;
	}
	.carousel-cell {
  	max-width: 420px;
  	img{
  		width: 100%;
  	}
  	
  	@media ${device.tablet} {
  	  	max-width: 702px;
  	}
  		
	}
	.carousel-cell-nav{
		max-width: 205px;
		img{
				width: 100%;
			}
	}
`
