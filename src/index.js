import './style.css'

const CLASS_PREFIX = 'promise-dialog__'

function getClassName(name) {
  return `${CLASS_PREFIX}${name}`
}

const DEFAULT_CSS_CONFIG = {
  root: getClassName('root'),
  button: getClassName('button'),
  okButton: getClassName('ok'),
  cancelButton: getClassName('cancel'),
  title: getClassName('title'),
  content: getClassName('content'),
  html: getClassName('html'),
  layer: getClassName('layer'),
  dialog: getClassName('dialog'),
  body: getClassName('body'),
  actions: getClassName('actions'),
  input: getClassName('input'),
  textarea: getClassName('textarea'),
  loading: getClassName('loading'),
  loadingIcon: getClassName('loadingIcon'),
  control: getClassName('control'),
  toast: getClassName('toast'),
  toastIcon: getClassName('toastIcon'),
}

const PROMISE_DIALOG_CONFIG = {
  okText: 'OK',
  cancelText: 'Cancel',
  TOAST_TIMER: undefined,
  PROMISE_DIALOG_SHARE_MOUNTER: undefined,
  classes: {
    ...DEFAULT_CSS_CONFIG,
  },
}

const IconTypes = {
  success: 'success',
  warn: 'warn',
}

const IconSvg = {
  success: className =>
    `<svg viewBox="0 0 1024 1024" ${
      className ? `class="${className}"` : ''
    } xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" role="img" aria-hidden="true"><path d="M963.2 208c-12.8-12.8-32-12.8-44.8 0L396.8 668.8c-12.8 9.6-28.8 9.6-41.6 0l-249.6-192c-12.8-12.8-32-12.8-44.8 0-12.8 12.8-12.8 32 0 44.8L355.2 816c12.8 12.8 32 12.8 44.8 0l563.2-563.2c12.8-12.8 12.8-35.2 0-44.8z" /></svg>`,
  warn: className =>
    `<svg viewBox="0 0 1024 1024" ${
      className ? `class="${className}"` : ''
    } xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" fill="currentColor" role="img" aria-hidden="true"><path d="M849.12 928.704H174.88c-45.216 0-81.536-17.728-99.68-48.64-18.144-30.912-15.936-71.296 6.08-110.752l340.192-609.664c22.144-39.744 55.072-62.528 90.304-62.528s68.128 22.752 90.336 62.464l340.544 609.792c22.016 39.456 24.288 79.808 6.112 110.72-18.112 30.912-54.464 48.608-99.648 48.608zM511.808 161.12c-11.2 0-24.032 11.104-34.432 29.696L137.184 800.544c-10.656 19.136-13.152 36.32-6.784 47.168 6.368 10.816 22.592 17.024 44.48 17.024h674.24c21.92 0 38.112-6.176 44.48-17.024 6.336-10.816 3.872-28-6.816-47.136L546.24 190.816c-10.368-18.592-23.264-29.696-34.432-29.696zM512 640c-17.664 0-32-14.304-32-32V320c0-17.664 14.336-32 32-32s32 14.336 32 32v288c0 17.696-14.336 32-32 32z m-48 112.128a1.5 1.5 0 1 0 96 0 1.5 1.5 0 1 0-96 0z" /></svg>`,
  loading: className =>
    `<svg viewBox="0 0 1024 1024" ${
      className ? `class="${className}"` : ''
    } xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" role="img" aria-hidden="true"><path d="M980.752 313.697c-25.789-60.972-62.702-115.725-109.713-162.736-47.012-47.011-101.764-83.924-162.736-109.713C645.161 14.542 578.106 1 509 1c-2.242 0-4.48 0.015-6.715 0.043-16.567 0.211-29.826 13.812-29.615 30.38 0.209 16.438 13.599 29.618 29.99 29.618l0.39-0.002c1.98-0.026 3.963-0.039 5.95-0.039 61.033 0 120.224 11.947 175.93 35.508 53.82 22.764 102.162 55.359 143.683 96.879s74.115 89.862 96.88 143.683C949.054 392.776 961 451.967 961 513c0 16.568 13.432 30 30 30s30-13.432 30-30c0-69.106-13.541-136.162-40.248-199.303z" /></svg>`,
}

export function setConfig({ okText, cancelText, classes }) {
  if (!('PROMISE_DIALOG_CONFIG' in window)) {
    window.PROMISE_DIALOG_CONFIG = { ...PROMISE_DIALOG_CONFIG }
  }
  if (okText) {
    window.PROMISE_DIALOG_CONFIG.okText = okText
  }
  if (cancelText) {
    window.PROMISE_DIALOG_CONFIG.cancelText = cancelText
  }
  window.PROMISE_DIALOG_CONFIG.classes = classes || { ...DEFAULT_CSS_CONFIG }
}

export function scrollBack(x = 0, y = 0) {
  if (typeof window.scrollTo === 'function') {
    window.scrollTo(x, y)
  } else {
    window.scrollLeft = x
    window.scrollTop = y
  }
}

function $e(tagName, className) {
  const element = document.createElement(tagName)
  if (className) {
    element.className = className
  }
  return element
}

function $class(...classNames) {
  return classNames.filter(Boolean).join(' ')
}

function create(tagName, classes, props, children) {
  const element = $e(tagName, $class(...classes))
  if (props) {
    for (const key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key) && typeof props[key] !== 'undefined') {
        element[key] = props[key]
      }
    }
  }

  if (children) {
    for (const child of children) {
      if (child) {
        element.appendChild(child)
      }
    }
  }

  return element
}

function createActions(leftText, rightText, leftCancel) {
  const { classes } = window.PROMISE_DIALOG_CONFIG
  const leftButton = create(
    'button',
    [classes.button, leftCancel ? classes.cancelButton : classes.okButton],
    {
      textContent: leftText,
    }
  )
  const rightButton = create(
    'button',
    [classes.button, leftCancel ? classes.okButton : classes.cancelButton],
    {
      textContent: rightText,
    }
  )
  return [leftButton, rightButton]
}

function createHeader({ title, content, html }) {
  const { classes } = window.PROMISE_DIALOG_CONFIG
  const header = []
  if (title) {
    header.push(
      create('h3', [classes.title], {
        textContent: title,
      })
    )
  }
  if (content) {
    header.push(
      create('div', [classes.content], {
        textContent: content,
      })
    )
  }
  if (html) {
    // https://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
    // Note that at present, browsers will not execute the script if inserted using the innerHTML property, and likely never will especially as the element is not added to the document.
    header.push(
      create('div', [classes.html], {
        innerHTML: html,
      })
    )
  }
  return header
}

function createWrapper(theme, header, actions, zIndex) {
  const { classes } = window.PROMISE_DIALOG_CONFIG
  return create('div', [classes.root, theme], null, [
    create(
      'div',
      [classes.layer],
      {
        style: zIndex
          ? {
              zIndex,
            }
          : undefined,
      },
      [
        create('div', [classes.dialog], null, [
          create('div', [classes.body], null, header),
          create('div', [classes.actions], null, actions),
        ]),
      ]
    ),
  ])
}

export function alert(alertProps) {
  const {
    theme,
    title = '',
    content = '',
    html = '',
    buttonText,
    zIndex,
    onClose = () => {},
  } = alertProps
  const { classes } = window.PROMISE_DIALOG_CONFIG

  const button = create('button', [classes.button], {
    textContent: buttonText || window.PROMISE_DIALOG_CONFIG.okText,
  })
  const mounter = createWrapper(theme, createHeader({ title, content, html }), [button], zIndex)
  document.body.appendChild(mounter)

  return new Promise(function alertPromise(resolve) {
    button.addEventListener('click', function removeAlert() {
      document.body.removeChild(mounter)
      onClose()
      resolve()
    })
  })
}

export function syncAlert(alertProps) {
  alert(alertProps).then()
}

export function confirm(confirmProps) {
  const {
    theme,
    title = '',
    content = '',
    html = '',
    leftText,
    rightText,
    leftCancel = true,
    zIndex,
    onOk = () => {},
    onCancel = () => {},
  } = confirmProps

  const [leftButton, rightButton] = createActions(
    leftText || window.PROMISE_DIALOG_CONFIG.cancelText,
    rightText || window.PROMISE_DIALOG_CONFIG.okText,
    leftCancel
  )

  const mounter = createWrapper(
    theme,
    createHeader({ title, content, html }),
    [leftButton, rightButton],
    zIndex
  )
  document.body.appendChild(mounter)

  return new Promise(function confirmPromise(resolve, reject) {
    leftButton.addEventListener('click', function leftClick() {
      document.body.removeChild(mounter)
      if (leftCancel) {
        onCancel()
        reject()
      } else {
        onOk()
        resolve()
      }
    })

    rightButton.addEventListener('click', function rightClick() {
      document.body.removeChild(mounter)
      if (leftCancel) {
        onOk()
        resolve()
      } else {
        onCancel()
        reject()
      }
    })
  })
}

export function syncConfirm(confirmProps) {
  confirm(confirmProps).then()
}

export function prompt(promptConfig) {
  const {
    theme,
    title = '',
    placeholder = '',
    defaultValue = '',
    leftText,
    rightText,
    leftCancel = true,
    useInput = false,
    zIndex,
    onBlur = () => {},
    onOk = () => {},
    onCancel = () => {},
  } = promptConfig
  const { classes } = window.PROMISE_DIALOG_CONFIG

  const [leftButton, rightButton] = createActions(
    leftText || window.PROMISE_DIALOG_CONFIG.cancelText,
    rightText || window.PROMISE_DIALOG_CONFIG.okText,
    leftCancel
  )
  const input = useInput
    ? create('input', [classes.input], {
        type: 'text',
        placeholder: placeholder || title || '',
      })
    : create('textarea', [classes.textarea, classes.input], {
        placeholder: placeholder || title || '',
        rows: 3,
      })
  const mounter = createWrapper(
    theme,
    [...createHeader({ title }), create('div', [classes.control], null, [input])],
    [leftButton, rightButton],
    zIndex
  )
  document.body.appendChild(mounter)

  input.value = defaultValue
  input.focus()

  input.addEventListener('blur', onBlur)

  return new Promise(function confirmPromise(resolve, reject) {
    leftButton.addEventListener('click', function leftClick() {
      if (leftCancel) {
        onCancel()
        reject()
      } else {
        onOk(input.value)
        resolve(input.value)
      }
      document.body.removeChild(mounter)
    })

    rightButton.addEventListener('click', function rightClick() {
      if (leftCancel) {
        onOk(input.value)
        resolve(input.value)
      } else {
        onCancel()
        reject()
      }
      document.body.removeChild(mounter)
    })
  })
}

export function syncPrompt(promptProps) {
  prompt(promptProps).then()
}

function clear() {
  const shareMounter = window.PROMISE_DIALOG_CONFIG.PROMISE_DIALOG_SHARE_MOUNTER
  if (!shareMounter) {
    return
  }

  if (shareMounter.parentNode === document.body) {
    window.clearTimeout(window.PROMISE_DIALOG_CONFIG.TOAST_TIMER)
    document.body.removeChild(shareMounter)
    if (shareMounter.firstChild) {
      shareMounter.removeChild(shareMounter.firstChild)
    }
  }
}

export function toast(toastProps) {
  const { title = '', iconType, duration = 2000, zIndex, onClose = () => {} } = toastProps
  const shareMounter = window.PROMISE_DIALOG_CONFIG.PROMISE_DIALOG_SHARE_MOUNTER
  if (!shareMounter) {
    return Promise.resolve()
  }

  const { classes } = window.PROMISE_DIALOG_CONFIG

  clear()

  const toaster = create('div', [classes.toast], {
    style: zIndex ? { zIndex } : undefined,
  })
  const titleNode = create('h3', [classes.title], {
    textContent: title,
  })

  if (iconType && IconTypes[iconType]) {
    const icon = $e('span', $class(classes.toastIcon))
    icon.dataset.icon = iconType
    icon.innerHTML = IconSvg[iconType]('icon-image')

    toaster.appendChild(icon)
  }

  toaster.appendChild(titleNode)
  shareMounter.appendChild(toaster)

  document.body.appendChild(shareMounter)

  return new Promise(function toastPromise(resolve) {
    window.PROMISE_DIALOG_CONFIG.TOAST_TIMER = window.setTimeout(() => {
      resolve()
      onClose()
      clear()
    }, duration)
  })
}

export function syncToast(toastProps) {
  toast(toastProps)
}

export function loading(config) {
  const shareMounter = window.PROMISE_DIALOG_CONFIG.PROMISE_DIALOG_SHARE_MOUNTER
  if (!shareMounter) {
    return
  }

  const { classes } = window.PROMISE_DIALOG_CONFIG

  let text
  let z

  if (typeof config === 'object') {
    if ('title' in config) {
      text = config.title
    }
    if ('zIndex' in config) {
      z = config.zIndex
    }
  } else if (typeof config === 'string') {
    text = config
  }

  clear()

  const loader = create('div', [classes.loading])
  loader.innerHTML = IconSvg.loading(classes.loadingIcon)

  if (z) {
    loader.style.zIndex = z
  }

  if (text) {
    const title = create('h3', [classes.title])
    title.textContent = text
    loader.appendChild(title)
  }

  shareMounter.appendChild(loader)
  document.body.appendChild(shareMounter)
}

export function loaded() {
  clear()
}

if (typeof window !== 'undefined') {
  if (!window.PROMISE_DIALOG_CONFIG || !('okText' in window.PROMISE_DIALOG_CONFIG)) {
    window.PROMISE_DIALOG_CONFIG = {
      ...PROMISE_DIALOG_CONFIG,
    }
  }

  if (!window.PROMISE_DIALOG_CONFIG.PROMISE_DIALOG_SHARE_MOUNTER) {
    const { classes } = window.PROMISE_DIALOG_CONFIG
    window.PROMISE_DIALOG_CONFIG.PROMISE_DIALOG_SHARE_MOUNTER = $e('div', classes.root)
  }
}
