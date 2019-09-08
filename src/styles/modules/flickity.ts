import { device } from '@styles/global/breakpoints'
import { css } from 'styled-components'

export default css`
	.carousel, .carousel-modal{
		display: flex;
		flex-direction: column;
		position: relative;
		
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
	.carousel-modal{
		position: relative;
    justify-content: center;
    align-items: center;
    //height: 100%;
    //overflow: hidden;
    //height: 694px;
	}
	.carousel{
		.flickity-page-dots{
			
			@media ${device.tablet} {
				display: none;
			}
				
		}
				
		.previous, .next{
			display: none;
		}
		
	}
	.flickity-viewport{
		//max-height: 715px;
		width: 100%;
		transition: height 0.2s;
		overflow: hidden;
		//overflow-y: scroll;
		
		//.carousel-modal & {
		//	position: fixed;
		//	top: 50%;
		//	transform: translateY(-50%);
		//}
	}
	.flickity-enabled{
		outline: none;
	}
	.carousel-cell {
  	max-width: 420px;
  	cursor: pointer;
		&:hover{
			span{
				opacity: 1;
				transform: translateY(-50%)translateX(-50%);
			}
		}
  	span{
			transition: .3s;
			transform: translateY(-60%)translateX(-50%);
			opacity: 0;
  	}
  	img{
  		width: 100%;
  	}
  	
  	@media ${device.tablet} {
  	  	max-width: 700px;
  	}
  		
	}
	.carousel-cell-nav{
		max-width: 205px;
		cursor: pointer;
		img{
				width: 100%;
			}
	}
	.item-fullscreen{
		max-width: 1075px;
		//max-height: 694px;
		opacity: 0;
		transition: .3s;
		overflow-y: scroll;
		//position: fixed;
		&.is-selected{
			opacity: 1;
		}
		img{
				width: 100%;
			}
	}
	.flickity-button{
		position: fixed;
    background: hsla(0, 0%, 100%, 0.75);
    border: none;
    color: #333;
    cursor: pointer;
    transition: .3s;
    
    &:hover{
    	background: #fff;
    }
    
    &:disabled{
		opacity: 0.3;
    cursor: auto;
    pointer-events: none;
    }
	}
	.flickity-prev-next-button {
    top: 50%;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    left: 10px;
    transform: translateY(-50%);
    display: flex;
    svg{
    	position: relative;
    	top: 1px;
    	width: 100%;
    }
    &.next{
    	left: auto;
    	right: 10px;
    }
	}
`
