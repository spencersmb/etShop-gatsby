import { colors } from '@styles/global/colors'
import { css } from 'styled-components'

export default css`
.rangeslider{
	margin: 20px 0;
	position: relative;
	background: #e6e6e6;
	touch-action: none;
	
	.rangeslider__handle{
		background: ${colors.teal.i500};
    cursor: pointer;
    display: inline-block;
    position: absolute;
	}
	.rangeslider__handle-tooltip{
		width: 40px;
    height: 40px;
    text-align: center;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.8);
    font-weight: normal;
    font-size: 14px;
    transition: all 100ms ease-in;
    border-radius: 4px;
    display: inline-block;
    color: white;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
	}
}
.rangeslider, 
.rangeslider .rangeslider__fill{
		display: block;
}
.rangeslider-horizontal{
    height: 6px;
    border-radius: 10px;
    
    .rangeslider__handle{
			width: 30px;
			height: 30px;
			border-radius: 30px;
			top: 50%;
			transform: translate3d(-50%, -50%, 0);
			&:focus{
				outline:none;
			}
    }
    
    .rangeslider__fill{
			height: 100%;
			background-color: ${colors.teal.i500};
			border-radius: 10px;
			top: 0;
    }
    
    .rangeslider__handle-tooltip{
        top: -55px;
    }
}
.rangeslider__labels{
	position: relative;
}
`
