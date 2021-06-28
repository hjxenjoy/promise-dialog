interface ClassNameConfig {
  /** default: promise-dialog__root */
  root: string
  /** default: promise-dialog__button */
  button: string
  /** default: promise-dialog__ok */
  okButton: string
  /** default: promise-dialog__cancel */
  cancelButton: string
  /** default: promise-dialog__title */
  title: string
  /** default: promise-dialog__content */
  content: string
  /** default: promise-dialog__html */
  html: string
  /** default: promise-dialog__layer */
  layer: string
  /** default: promise-dialog__dialog */
  dialog: string
  /** default: promise-dialog__body */
  body: string
  /** default: promise-dialog__actions */
  actions: string
  /** default: promise-dialog__input */
  input: string
  /** default: promise-dialog__textarea */
  textarea: string
  /** default: promise-dialog__loading */
  loading: string
  /** default: promise-dialog__loadingIcon */
  loadingIcon: string
  /** default: promise-dialog__control */
  control: string
  /** default: promise-dialog__toast */
  toast: string
  /** default: promise-dialog__toastIcon */
  toastIcon: string
}

type ConfigType = {
  okText: string;
  cancelText: string
  classes?: ClassNameConfig
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
