export interface AlertConfig {
  title?: string
  content?: string
  buttonText?: string
}

export interface ConfirmConfig {
  title?: string
  content?: string
  leftText?: string
  rightText?: string
  leftCancel?: boolean
}

export interface ToastConfig {
  title?: string
  duration?: number
}

export interface LoadingConfig {
  title?: string
}

declare module 'promise-dialog' {
  function alert(config: AlertConfig): Promise<void>
  function confirm(config: ConfirmConfig): Promise<void>
  function toast(config: ToastConfig): Promise<void>
  function loading(config: LoadingConfig): void
  function loaded(): void
}
