// import { injectGlobal } from 'styled-components'
import { createGlobalStyle } from 'styled-components'
import cssReset from './cssReset'
import { colors } from './colors'
import toastr from '@styles/modules/toastr'

export default createGlobalStyle`

  ${cssReset}
  
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700');
  
  body{
    font-family: 'Roboto', sans-serif;
    letter-spacing: .8px;
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
  
  #___gatsby{
  	min-height: 100vh;
  }
  
  ${toastr}
`
