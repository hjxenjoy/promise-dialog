export interface AlertConfig {
  title?: string
  content?: string
  html?: string
  buttonText?: string
  zIndex?: number
}

export interface ConfirmConfig {
  title?: string
  content?: string
  html?: string
  leftText?: string
  rightText?: string
  leftCancel?: boolean
  zIndex?: number
}

export interface PromptConfig {
  title?: string
  placeholder?: string
  defaultValue?: string
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
  function prompt(config: PromptConfig): Promise<string>
  function toast(config: ToastConfig): Promise<void>
  function loading(config: LoadingConfig | string): void
  function loaded(): void
}
