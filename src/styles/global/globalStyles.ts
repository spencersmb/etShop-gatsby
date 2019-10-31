import { device } from '@styles/global/breakpoints'
import { createGlobalStyle } from 'styled-components'
import cssReset from './cssReset'
import cssFlickity from '../modules/flickity'
import rangeSlider from '../modules/rangeSlider'
import { colors } from './colors'
import toastr from '@styles/modules/toastr'

export default createGlobalStyle`

  ${cssReset}
  ${cssFlickity}
  
  body{
    font-family: 'Fira Sans', sans-serif;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    color: ${colors.text};
    position: relative;
    
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
  }
  
  svg{
  	width: 100%;
  }
  
  ${toastr}
  ${rangeSlider}
  
`
