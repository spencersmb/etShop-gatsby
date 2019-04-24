import { createGlobalStyle } from 'styled-components'
import cssReset from './cssReset'
import { colors } from './colors'
import toastr from '@styles/modules/toastr'
import { withPrefix } from 'gatsby'

// @ts-ignore
// import SentinelSemiBoldItalic from '../../assets/fonts/Sentinel-SemiBoldItal.otf'
// // @ts-ignore
// import SentinelSemiBold from '../../assets/fonts/Sentinel-SemiBold.otf'
// // @ts-ignore
// import SentinelBold from '../../assets/fonts/Sentinel-Bold.otf'
const customFont = withPrefix('/fonts/Sentinel-Semibold.woff2')
export default createGlobalStyle`

  ${cssReset}
  

		
	@font-face {
    font-family: "Sentinel";
    font-style: normal;
    font-weight: 600;
		src: url(${customFont}) format("woff2")
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
  		color: ${colors.primary.pink};
  	}
  }
  
  #___gatsby{
  	min-height: 100vh;
  }
  
  ${toastr}
`
