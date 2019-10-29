import { device } from '@styles/global/breakpoints'
import { css } from 'styled-components'

export default css`
	.carousel,
	.carousel-modal
	{
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
	//	position: relative;
    //justify-content: center;
    //align-items: center;
    
		.flickity-page-dots{
			.dot{
				background: #fff;
			}
		}
    
    // USED FOR MIDDLE PLACEMENT
    overflow: hidden;
	}
	.carousel{
			display: flex;
		flex-direction: column;
		position: relative;
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
		width: 100%;
		transition: height 0.2s;
		overflow: hidden;
	}
	.flickity-enabled{
		outline: none;
	}
	.carousel-cell {
  	max-width: 420px;
  	cursor: pointer;
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
  		
		@media ${device.laptop} {
			&:hover{
				span{
					opacity: 1;
					transform: translateY(-50%)translateX(-50%);
				}
			}

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
		max-width: 728px;
		opacity: 0;
		transition: opacity .3s;

		&.is-selected{
			opacity: 1;
		}
		img{
				width: 100%;
			}
			
		@media ${device.tablet} {
			max-width: 728px;
		}
			
		@media ${device.laptop} {
			max-width: 1075px;
		}
			
	}
	
	
	.flickity-button{
		position: fixed;
    background: hsla(0, 0%, 100%, 0.75);
    border: none;
    color: #333;
    cursor: pointer;
    transition: .3s;
    display: none;
    &:hover{
    	background: #fff;
    }
    
    &:disabled{
		opacity: 0.3;
    cursor: auto;
    pointer-events: none;
    }
    
    @media ${device.laptop} {
			display: block;        
    }
    	
	}
	.flickity-prev-next-button {
    top: 50%;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    left: 10px;
    transform: translateY(-50%);
    display: none;
    svg{
    	position: relative;
    	top: 1px;
    	width: 100%;
    }
    &.next{
    	left: auto;
    	right: 10px;
    }
    
		@media ${device.laptop} {
			display: flex;        
    }
	}
`
