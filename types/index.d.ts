export interface AlertConfig {
  title?: string
  content?: string
  buttonText?: string
  zIndex?: number
}

export interface ConfirmConfig {
  title?: string
  content?: string
  leftText?: string
  rightText?: string
  leftCancel?: boolean
  zIndex?: number
}

export interface ToastConfig {
  title?: string
  duration?: number
  zIndex?: number
}

export interface LoadingConfig {
  title?: string
  zIndex?: number
}

declare module 'promise-dialog' {
  function alert(config: AlertConfig): Promise<void>
  function confirm(config: ConfirmConfig): Promise<void>
  function toast(config: ToastConfig): Promise<void>
  function loading(config: LoadingConfig): void
  function loaded(): void
}
