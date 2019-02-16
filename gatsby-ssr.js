/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import wrapWithProvider from './wrap-with-provider'
export const wrapRootElement = wrapWithProvider

// thrd party script ex
// exports.onRenderBody = ({ setHeadComponents }) => {
// //   setHeadComponents([<script {put_attributes_here} />])
// // }