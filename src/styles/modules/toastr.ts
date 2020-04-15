import { css } from 'styled-components'
import { colors } from '@styles/global/colors'
import { media } from '@styles/global/breakpoints'

export default css`

.animated{-webkit-animation-duration:1s;animation-duration:1s;-webkit-animation-fill-mode:both;animation-fill-mode:both}.animated.bounceIn{-webkit-animation-duration:.7s;animation-duration:.7s}.animated.bounceOut{-webkit-animation-duration:.5s;animation-duration:.5s}.animated.bounceIn{-webkit-animation-name:bounceIn;animation-name:bounceIn}.animated.bounceOut{-webkit-animation-name:bounceOut;animation-name:bounceOut}.animated.fadeIn{-webkit-animation-name:fadeIn;animation-name:fadeIn;-webkit-animation-duration:.7s;animation-duration:.7s}.animated.fadeOut{-webkit-animation-name:fadeOut;animation-name:fadeOut;-webkit-animation-duration:.3s;animation-duration:.3s}.animated.bounceInDown{-webkit-animation-name:bounceInDown;animation-name:bounceInDown}.animated.bounceOutUp{-webkit-animation-name:bounceOutUp;animation-name:bounceOutUp}@-webkit-keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1);animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}0%{opacity:0;-webkit-transform:perspective(1px) scale3d(0.3, 0.3, 0.3);transform:perspective(1px) scale3d(0.3, 0.3, 0.3)}20%{-webkit-transform:perspective(1px) scale3d(1.1, 1.1, 1.1);transform:perspective(1px) scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:perspective(1px) scale3d(0.9, 0.9, 0.9);transform:perspective(1px) scale3d(0.9, 0.9, 0.9)}60%{opacity:1;-webkit-transform:perspective(1px) scale3d(1.03, 1.03, 1.03);transform:perspective(1px) scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:perspective(1px) scale3d(0.97, 0.97, 0.97);transform:perspective(1px) scale3d(0.97, 0.97, 0.97)}to{opacity:1;-webkit-transform:perspective(1px) scale3d(1, 1, 1);transform:perspective(1px) scale3d(1, 1, 1)}}@keyframes bounceIn{from,20%,40%,60%,80%,to{-webkit-animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1);animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}0%{opacity:0;-webkit-transform:perspective(1px) scale3d(0.3, 0.3, 0.3);transform:perspective(1px) scale3d(0.3, 0.3, 0.3)}20%{-webkit-transform:perspective(1px) scale3d(1.1, 1.1, 1.1);transform:perspective(1px) scale3d(1.1, 1.1, 1.1)}40%{-webkit-transform:perspective(1px) scale3d(0.9, 0.9, 0.9);transform:perspective(1px) scale3d(0.9, 0.9, 0.9)}60%{opacity:1;-webkit-transform:perspective(1px) scale3d(1.03, 1.03, 1.03);transform:perspective(1px) scale3d(1.03, 1.03, 1.03)}80%{-webkit-transform:perspective(1px) scale3d(0.97, 0.97, 0.97);transform:perspective(1px) scale3d(0.97, 0.97, 0.97)}to{opacity:1;-webkit-transform:perspective(1px) scale3d(1, 1, 1);transform:perspective(1px) scale3d(1, 1, 1)}}@-webkit-keyframes bounceOut{20%{-webkit-transform:scale3d(0.9, 0.9, 0.9);transform:scale3d(0.9, 0.9, 0.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}to{opacity:0;-webkit-transform:scale3d(0.3, 0.3, 0.3);transform:scale3d(0.3, 0.3, 0.3)}}@keyframes bounceOut{20%{-webkit-transform:scale3d(0.9, 0.9, 0.9);transform:scale3d(0.9, 0.9, 0.9)}50%,55%{opacity:1;-webkit-transform:scale3d(1.1, 1.1, 1.1);transform:scale3d(1.1, 1.1, 1.1)}to{opacity:0;-webkit-transform:scale3d(0.3, 0.3, 0.3);transform:scale3d(0.3, 0.3, 0.3)}}@-webkit-keyframes fadeIn{from{opacity:0}to{opacity:1}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}@-webkit-keyframes fadeOut{from{opacity:1}to{opacity:0}}@keyframes fadeOut{from{opacity:1}to{opacity:0}}@-webkit-keyframes bounceInDown{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1);animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}0%{opacity:0;-webkit-transform:translate3d(0, -3000px, 0);transform:translate3d(0, -3000px, 0)}60%{opacity:1;-webkit-transform:translate3d(0, 25px, 0);transform:translate3d(0, 25px, 0)}75%{-webkit-transform:translate3d(0, -10px, 0);transform:translate3d(0, -10px, 0)}90%{-webkit-transform:translate3d(0, 5px, 0);transform:translate3d(0, 5px, 0)}to{-webkit-transform:none;transform:none}}@keyframes bounceInDown{from,60%,75%,90%,to{-webkit-animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1);animation-timing-function:cubic-bezier(0.215, 0.61, 0.355, 1)}0%{opacity:0;-webkit-transform:translate3d(0, -3000px, 0);transform:translate3d(0, -3000px, 0)}60%{opacity:1;-webkit-transform:translate3d(0, 25px, 0);transform:translate3d(0, 25px, 0)}75%{-webkit-transform:translate3d(0, -10px, 0);transform:translate3d(0, -10px, 0)}90%{-webkit-transform:translate3d(0, 5px, 0);transform:translate3d(0, 5px, 0)}to{-webkit-transform:none;transform:none}}@-webkit-keyframes bounceOutUp{20%{-webkit-transform:translate3d(0, -10px, 0);transform:translate3d(0, -10px, 0)}40%,45%{opacity:1;-webkit-transform:translate3d(0, 20px, 0);transform:translate3d(0, 20px, 0)}to{opacity:0;-webkit-transform:translate3d(0, -2000px, 0);transform:translate3d(0, -2000px, 0)}}@keyframes bounceOutUp{20%{-webkit-transform:translate3d(0, -10px, 0);transform:translate3d(0, -10px, 0)}40%,45%{opacity:1;-webkit-transform:translate3d(0, 20px, 0);transform:translate3d(0, 20px, 0)}to{opacity:0;-webkit-transform:translate3d(0, -2000px, 0);transform:translate3d(0, -2000px, 0)}}.rrt-confirm-holder{width:100%;height:100%;position:fixed;top:0;left:0;z-index:99999999}.rrt-confirm-holder .shadow{width:100%;height:100%;background-color:rgba(50,58,68,0.8)}.rrt-confirm-holder .rrt-confirm{width:320px;background-color:white;position:absolute;z-index:9;top:20%;left:50%;margin-left:-160px;box-shadow:3px 3px 20px #333;border-radius:4px;overflow:hidden}.rrt-confirm-holder .rrt-confirm .rrt-message{width:100%;padding:5%;min-height:50px;font-size:1em;background-color:white;text-align:center;font-family:'open-sanscondensed-light', sans-serif;clear:both}.rrt-confirm-holder .rrt-confirm .rrt-buttons-holder{display:-webkit-box;display:-ms-flexbox;display:flex}.rrt-confirm-holder .rrt-confirm .rrt-buttons-holder .rrt-button{-webkit-box-flex:1;-ms-flex-positive:1;flex-grow:1;height:50px;text-transform:capitalize;border:none;background-color:transparent;padding:0;margin:0;float:left;border-top:1px solid #f0f0f0;font-size:14px;overflow:hidden;cursor:pointer}.rrt-confirm-holder .rrt-confirm .rrt-buttons-holder .rrt-button:hover{background-color:#f5f5f5}.rrt-confirm-holder .rrt-confirm .rrt-buttons-holder .rrt-button.rrt-ok-btn:active{background-color:#60bb71;color:white}.rrt-confirm-holder .rrt-confirm .rrt-buttons-holder .rrt-button.rrt-cancel-btn:active{background-color:#db6a64;color:white}.rrt-confirm-holder .rrt-confirm .rrt-buttons-holder .rrt-button:focus{outline:none}body.toastr-confirm-active{overflow:hidden}.redux-toastr *,.redux-toastr *:before,.redux-toastr *:after{box-sizing:border-box}.redux-toastr .top-left,.redux-toastr .top-right,.redux-toastr .top-center,.redux-toastr .bottom-left,.redux-toastr .bottom-right,.redux-toastr .bottom-center{width:350px;position:fixed;z-index:99999999;padding:0 10px}.redux-toastr .top-left,.redux-toastr .top-right,.redux-toastr .top-center{top:0}.redux-toastr .top-right,.redux-toastr .bottom-right{right:0}.redux-toastr .bottom-left,.redux-toastr .bottom-right,.redux-toastr .bottom-center{bottom:0}.redux-toastr .top-left,.redux-toastr .bottom-left{left:0}.redux-toastr .top-center,.redux-toastr .bottom-center{left:50%;margin-left:-175px}@media (max-width: 320px){.redux-toastr .top-left,.redux-toastr .top-right,.redux-toastr .top-center,.redux-toastr .bottom-left,.redux-toastr .bottom-right,.redux-toastr .bottom-center{width:320px}.redux-toastr .top-center,.redux-toastr .bottom-center{margin-left:-160px}}.redux-toastr .toastr{background-color:#fcfcfc;width:100%;min-height:70px;overflow:hidden;margin:10px 0;border-radius:4px;position:relative;z-index:2;color:#333;opacity:.94;box-shadow:2px 2px 10px rgba(0,0,0,0.4)}.redux-toastr .toastr:hover:not(.rrt-message){box-shadow:0px 0px 10px rgba(0,0,0,0.6);opacity:1}.redux-toastr .toastr .toastr-status{width:100%;height:5px}.redux-toastr .toastr .toastr-status.success{background-color:#60bb71}.redux-toastr .toastr .toastr-status.warning{background-color:#f7a336}.redux-toastr .toastr .toastr-status.info{background-color:#58abc3}.redux-toastr .toastr .toastr-status.error{background-color:#db6a64}.redux-toastr .toastr .rrt-left-container,.redux-toastr .toastr .rrt-right-container{float:left;text-align:center;overflow:hidden}.redux-toastr .toastr .rrt-left-container{width:80px;top:0;left:0;position:absolute;bottom:0}.redux-toastr .toastr .rrt-left-container .rrt-holder{width:70px;height:70px;position:absolute;top:50%;margin-top:-35px;left:5px;line-height:60px}.redux-toastr .toastr .rrt-left-container .toastr-icon{fill:white;vertical-align:middle;margin-top:5px}.redux-toastr .toastr .rrt-middle-container{width:65%;margin-left:80px;position:relative;float:left;font-family:Arial, Helvetica, sans-serif, sans-serif;font-size:1em;text-align:left;padding:10px 5px}.redux-toastr .toastr .rrt-middle-container .rrt-title{font-size:1.1em;font-weight:bold;margin-bottom:5px}.redux-toastr .toastr .rrt-right-container{width:10%}.redux-toastr .toastr .close-toastr{width:10%;height:100%;position:absolute;top:0;right:0;background-color:transparent;font-size:22px;border:none;outline:none;opacity:0.5;cursor:pointer;font-family:"Helvetica Neue", Helvetica, Arial sans-serif}.redux-toastr .toastr .close-toastr:hover{opacity:1}.redux-toastr .toastr .close-toastr:focus{outline:none}.redux-toastr .toastr.rrt-info,.redux-toastr .toastr.rrt-success,.redux-toastr .toastr.rrt-warning,.redux-toastr .toastr.rrt-error{color:white}.redux-toastr .toastr.rrt-info{background-color:#58abc3}.redux-toastr .toastr.rrt-info .rrt-progressbar{background-color:#378298}.redux-toastr .toastr.rrt-success{background-color:#60bb71}.redux-toastr .toastr.rrt-success .rrt-progressbar{background-color:#3e914d}.redux-toastr .toastr.rrt-warning{background-color:#f7a336}.redux-toastr .toastr.rrt-warning .rrt-progressbar{background-color:#d87e09}.redux-toastr .toastr.rrt-error{background-color:#db6a64}.redux-toastr .toastr.rrt-error .rrt-progressbar{background-color:#c5352e}.redux-toastr .toastr.rrt-light .rrt-progressbar{background-color:#ccc}.redux-toastr .toastr.rrt-light .toastr-icon{fill:#333 !important}.redux-toastr .toastr.rrt-message{opacity:1;border:1px solid #dbdbdb}.redux-toastr .toastr.rrt-message .rrt-title{width:90%;height:50px;text-align:center;overflow:hidden;font-size:1.2em;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;line-height:50px;padding:0 20px}.redux-toastr .toastr.rrt-message .rrt-text{width:100%;max-height:400px;overflow:hidden;overflow-y:auto;border-top:1px solid #f1f1f1;border-bottom:1px solid #f1f1f1;background-color:white;padding:15px;font-size:1.1em;margin-bottom:20px}.redux-toastr .toastr.rrt-message .rrt-text img{display:block;margin:10px auto;max-width:100%}.redux-toastr .toastr.rrt-message .close-toastr{height:50px}.redux-toastr .toastr .rrt-progress-container{height:5px;margin:0 -20px -20px -60px;position:absolute;bottom:20px;width:100%}.redux-toastr .toastr .rrt-progress-container .rrt-progressbar{border-radius:0 0 0 4px;height:100%}.redux-toastr .toastr-attention{width:100%;height:100%;position:fixed;top:0;left:0;right:0;bottom:0;background-color:rgba(0,0,0,0.4);z-index:1}


.redux-toastr {
  .bottom-right {
    width: 100%;
    
    ${media.tablet`
      width: 350px;
    `}
    ${media.laptop`
      width: 500px;
    `}
  }
  .toastr{
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20px;
    & > div {
      // target first wrapper div
      display: flex;
      flex-direction: row;
      
    }
    .rrt-left-container{
      display: flex;
      align-items: center;
      padding-right: 20px;
      .rrt-holder{
        //background: #fff;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        margin:0 auto;
        position: initial;
        
        svg{
          width: 30px !important;
          height: 30px !important;
        }
      }
      .toastr-icon{
      	margin-top: 1px;
      }
    }
    .rrt-middle-container{
				margin-left: 40px;
      .rrt-title{
        font-size: 18px;
      }
      .rrt-text{
        font-size: 14px;
        font-weight: 300;
      }
    }
    &.rrt-error{
      background-color: ${colors.red};
      svg{
        path{
          transform: translateX(4.5px)translateY(4px);
          fill: #fff;
        }
      }
    }
    &.rrt-success{
      background-color:  ${colors.green};
      
      svg{
        path{
          fill: #fff;
        }
      }
      
    }
  }
}
`
