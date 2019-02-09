import * as React from 'react'

export interface IProps {
  /** this dictates what the button will say  */
  label: string;
  /** this dictates what the button will do  */
  onClick: () => void;
  /**
   * Disables onclick
   *
   * @default false
   **/
  disabled?: boolean;

  children: any;
}

const noop = () => {} // tslint:disable-line
export const Button = (props: IProps) => {
  const {label, onClick, children, disabled = false} = props
  const disabledclass = disabled ? 'Button_disabled' : ''
  return (
    <div
      className={`Button ${disabledclass}`}
      onClick={!disabled ? onClick : noop}
    >
      <span>{label}</span>
      <span>{children}</span>
    </div>
  )
}
