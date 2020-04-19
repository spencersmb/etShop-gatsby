import { device } from '@styles/global/breakpoints'
import { radioClass } from '@styles/global/inputs'
import { createGlobalStyle } from 'styled-components'
import cssReset from './cssReset'
import cssFlickity from '../modules/flickity'
import rangeSlider from '../modules/rangeSlider'
import { colors } from './colors'
import toastr from '@styles/modules/toastr'

export default createGlobalStyle`
:root {
		--space-unit:  1em;
		--space-xxxs:  calc(0.25 * var(--space-unit));
		--space-xs:    calc(0.5 * var(--space-unit));
		--slideshow-height: 280px;
	
		// transitions
		--slideshow-fade-transition-duration: 0.25s; // fade effect transition duration
		--slideshow-slide-transition-duration: 0.35s; // slide effect transition duration
		--slideshow-prx-transition-duration: 0.5s; // parallax effect transition duration
		--ease-out: cubic-bezier(0.215, 0.61, 0.355, 1);
	
		// controls
		--slideshow-btn-width: 1.6em; 
		--slideshow-btn-height: 3.2em;
		--slideshow-btn-icon-size: 1.6em;
		--slideshow-btn-offset: var(--space-xs); // gap between button and slideshow edges
		
		--color-black:hsl(240, 8%, 12%);
    --color-bg: hsl(0, 0%, 100%);
    --color-contrast-high:hsl(240, 4%, 20%);
    --color-contrast-higher: hsl(240, 8%, 12%);
    
    --radius: 0.25em; 
    --radius-sm: calc(var(--radius, 0.25em)/2);
    --radius-md: var(--radius, 0.25em);
		
		@media ${device.sm}{
			--slideshow-height: 380px;
		}
		@media ${device.md}{
			--slideshow-height: 480px;
		}
		@media ${device.lg}{
			--slideshow-height: 580px;
		}
	}

  ${cssReset}
  ${cssFlickity}
  
  body{
    font-family: 'Fira Sans', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    color: ${colors.text};
    position: relative;
    overflow-x: hidden;
    
    &.mobileNavOpen{
      overflow-y: hidden;
    }
  }
  
  h1{
		color: ${colors.text};
		//font-family: "Sentinel Black", serif;
  }
  
  a{
  	transition: color .3s;
  	will-change: color;
  	
  	@media ${device.laptop} {
			&:hover{
				color: ${colors.primary.pink};
			}
  	}
  		
  }
  
  #___gatsby{
  	min-height: 100vh;
  	display: flex;
  	flex-direction: column;
  }
  #gatsby-focus-wrapper, #app{
    display: flex;
  	flex-direction: column;
  	flex: 1;
  }
  
  svg{
  	width: 100%;
  }
  input{
    -webkit-appearance: none;
    -moz-appearance: none;
    -moz-appearance: textfield;
    appearance: none;
    &:focus{
      outline: none;
    }
    &::-webkit-outer-spin-button, 
    ::-webkit-inner-spin-button{
      -webkit-appearance: none;
      margin: 0;
    };
  }
  ${toastr}
  ${rangeSlider}
  ${radioClass}
  
`
