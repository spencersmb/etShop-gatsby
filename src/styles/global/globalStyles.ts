import { device } from '@styles/global/breakpoints'
import { radioClass } from '@styles/global/inputs'
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
