import { bool } from 'prop-types'
import { ComponentType } from 'react'

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

export interface IModalOptions {
  closeModal: boolean,
  hasBackground: boolean,
  content?: string,
  name?: string,
  data?: any
}
export interface IModal {
  closeModal: () => void,
  options: IModalOptions
}
export interface IModalState {
  component: ComponentType<any> | null,
  options: IModalOptions | {},
  show: boolean,
}

export interface IShowModalProps {
  modal: ComponentType<any>,
  options: IModalOptions
}

export type OnPoseComplete = string | string[]

export interface INavState {
  isOpen: boolean
}
