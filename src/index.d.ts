type ConfigType = {
  okText: string;
  cancelText: string
}

interface AlertConfig {
  theme?: string;
  title?: string;
  content?: string;
  html?: string;
  buttonText?: string;
  zIndex?: number;
}

interface ConfirmConfig {
  theme?: string;
  title?: string;
  content?: string;
  html?: string;
  leftText?: string;
  rightText?: string;
  leftCancel?: boolean;
  zIndex?: number;
}

interface PromptConfig {
  theme?: string;
  title?: string;
  placeholder?: string;
  defaultValue?: string;
  leftText?: string;
  rightText?: string;
  leftCancel?: boolean;
  zIndex?: number;
  onBlur?: (evt: FocusEvent) => void
}

interface ToastConfig {
  title?: string;
  duration?: number;
  zIndex?: number;
  iconType?: 'success' | 'warn';
}

interface LoadingConfig {
  title?: string;
  zIndex?: number;
}

export function setConfig(config: ConfigType): void
export function scrollBack(x?: number, y?: number): void
export function alert(config: AlertConfig): Promise<void> | void;
export function confirm(config: ConfirmConfig): Promise<void>;
export function prompt(config: PromptConfig): Promise<string>;
export function toast(config: ToastConfig): Promise<void> | void;
export function loading(config: LoadingConfig | string): void;
export function loaded(): void;
