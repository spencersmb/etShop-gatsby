import { ComponentType } from 'react'

export interface IModalOptions {
  closeOutsideModal: boolean,
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