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
  onClose?(): void;
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
  onOk?(): void;
  onCancel?(): void;
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
  useInput?: boolean;
  onBlur?: (evt: FocusEvent) => void;
  onOk?(value: string): void;
  onCancel?(): void;
}

interface ToastConfig {
  title?: string;
  duration?: number;
  zIndex?: number;
  iconType?: 'success' | 'warn';
  onClose?(): void;
}

interface LoadingConfig {
  title?: string;
  zIndex?: number;
}

export function setConfig(config: ConfigType): void;
export function scrollBack(x?: number, y?: number): void;
export function alert(config: AlertConfig): Promise<void>;
export function syncAlert(config: AlertConfig): void;
export function confirm(config: ConfirmConfig): Promise<void>;
export function syncConfirm(config: ConfirmConfig): void;
export function prompt(config: PromptConfig): Promise<string>;
export function syncPrompt(config: PromptConfig): void;
export function toast(config: ToastConfig): Promise<void>;
export function syncToast(config: ToastConfig): void;
export function loading(config: LoadingConfig | string): void;
export function loaded(): void;
