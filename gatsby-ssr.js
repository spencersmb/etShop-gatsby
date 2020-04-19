/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import wrapWithProvider from "./wrap-with-provider"
import React from "react"

export const wrapRootElement = wrapWithProvider

export const onRenderBody = ({ setPostBodyComponents }) => {
  setPostBodyComponents([
    <script id='swiper'
            key={`swiper-js`}
            src={`/js/swiper.js`}/>
  ])
}
// thrd party script ex
// exports.onRenderBody = ({ setHeadComponents }) => {
//   setHeadComponents([<script id="stripe-js" src="https://js.stripe.com/v3/"/>])
// }
