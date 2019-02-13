import React, { RefObject } from 'react'

export interface IPoseHoc {
  ref: RefObject<any>,
  renderProps: { [id: string]: any }
}
/**
 * ? Adds the ability to pass a ref to a component so we can pas our own
 * ? component to the animation so the ref goes to the
 * ? top div in the component
 */
const PoseHoc = React.forwardRef((props: { [id: string]: any }, ref: any) => {
  const getStateAndHelpers = (): IPoseHoc => {
    return {
      ref,
      renderProps: { ...props }
    }
  }

  return props.children(getStateAndHelpers())
})

export default PoseHoc
