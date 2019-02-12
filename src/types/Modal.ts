import { ComponentType } from 'react'

interface IModalOptions {
  closeOutsideModal: boolean,
  content: string,
  hasBackground: boolean,
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