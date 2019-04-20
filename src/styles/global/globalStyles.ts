// import { injectGlobal } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import cssReset from './cssReset'
import { colors } from './colors'
import toastr from '@styles/modules/toastr'
import SentinalSemiBoldWOFF2 from '../../assets/fonts/Sentinel-Semibold.woff2'
import SentinalSemiBoldItalicWOFF2 from '../../assets/fonts/Sentinel-SemiboldItal.woff2'

export default createGlobalStyle`

  ${cssReset}
  
  @font-face {
    font-family: "Sentinel-SemiBold";
    font-style: normal;
    font-weight: normal;
			src: local("Sentinal Semibold"), 
			url(${SentinalSemiBoldWOFF2}) format("woff2"), 
		}
  
  body{
    font-family: 'Fira Sans', sans-serif;
    //letter-spacing: .8px;
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
  }
  
  a{
  	transition: color .3s;
  	will-change: color;
  	&:hover{
  		color: ${colors.primary.pink}
  	}
  }
  
  #___gatsby{
  	min-height: 100vh;
  }
  
  ${toastr}
`
