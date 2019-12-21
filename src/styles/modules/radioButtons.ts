import { css } from 'styled-components'

export default css`
    a{
  color: #5A44E2;
  text-decoration: none;
  }
    .headerPrimary{
    padding: 30px 30px;
    }
    .headerSecondary{
    padding: 50px 30px 20px;
    }
    .body_primary{
      padding: 30px 30px 15px;
    }  
    .text-lrg{ font-size: 24px; } 
       .spacerLrg{ padding: 0 20px; } 
       .mainHeader__spacing{
       padding: 30px 30px 30px;
       }  
      .et-container{
      padding:0px 30px 0px 30px ;
       } 
      .coupon-container{
      padding: 0 20px;
      }

      
  @media only screen and (min-width:768px) {
    .headerPrimary{
  padding: 50px 60px;
  }
  .headerSecondary{
  padding: 30px 60px 30px;
  }
  .text-lrg{ font-size: 45px; } 
  .spacerLrg{ padding: 0 80px; }
  .body_primary{
    padding:30px 60px 15px;
  } 
  .mainHeader__spacing{
    padding:60px 60px 30px;
  } 
      .et-container{
      padding:0 60px 0px 60px;
      }
      .coupon-container{
      padding: 0 120px;
      }
  }
`
