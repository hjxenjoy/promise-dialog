import './style.css'

const PROMISE_DIALOG_CONFIG = {
  okText: 'OK',
  cancelText: 'Cancel',
  TOAST_TIMER: undefined,
  PROMISE_DIALOG_SHARE_MOUNTER: undefined,
}

const IconTypes = {
  success: 'success',
  warn: 'warn',
}

export function setConfig({ okText, cancelText }) {
  if (!('PROMISE_DIALOG_CONFIG' in window)) {
    window.PROMISE_DIALOG_CONFIG = { ...PROMISE_DIALOG_CONFIG }
  }
  if (okText) {
    window.PROMISE_DIALOG_CONFIG.okText = okText
  }
  if (cancelText) {
    window.PROMISE_DIALOG_CONFIG.cancelText = cancelText
  }
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
  return classNames
    .filter(Boolean)
    .map(clz => `promise-dialog__${clz}`)
    .join(' ')
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
  const leftButton = create('button', ['button', leftCancel ? 'cancel' : ''], {
    textContent: leftText,
  })
  const rightButton = create('button', ['button', leftCancel ? '' : 'cancel'], {
    textContent: rightText,
  })
  return [leftButton, rightButton]
}

function createHeader({ title, content, html }) {
  const header = []
  if (title) {
    header.push(
      create('h3', ['title'], {
        textContent: title,
      })
    )
  }
  if (content) {
    header.push(
      create('div', ['content'], {
        textContent: content,
      })
    )
  }
  if (html) {
    // https://stackoverflow.com/questions/6659351/removing-all-script-tags-from-html-with-js-regular-expression
    // Note that at present, browsers will not execute the script if inserted using the innerHTML property, and likely never will especially as the element is not added to the document.
    header.push(
      create('div', ['html'], {
        innerHTML: html,
      })
    )
  }
  return header
}

function createWrapper(theme, header, actions, zIndex) {
  return create('div', ['mounter', theme], null, [
    create(
      'div',
      ['layer'],
      {
        style: zIndex
          ? {
              zIndex,
            }
          : undefined,
      },
      [
        create('div', ['layer'], null, [
          create('div', ['dialog'], null, [
            create('div', ['body'], null, header),
            create('div', ['actions'], null, actions),
          ]),
        ]),
      ]
    ),
  ])
}

export function alert({
  theme,
  title = '',
  content = '',
  html = '',
  buttonText,
  zIndex,
  onClose = () => {},
}) {
  const button = create('button', ['button'], {
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

export function confirm({
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
}) {
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

export function prompt({
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
}) {
  const [leftButton, rightButton] = createActions(
    leftText || window.PROMISE_DIALOG_CONFIG.cancelText,
    rightText || window.PROMISE_DIALOG_CONFIG.okText,
    leftCancel
  )
  const input = useInput
    ? create('input', ['input'], {
        type: 'text',
        placeholder: placeholder || title || '',
      })
    : create('textarea', ['textarea', 'input'], {
        placeholder: placeholder || title || '',
        rows: 3,
      })
  const mounter = createWrapper(
    theme,
    [...createHeader({ title }), create('div', ['control'], null, [input])],
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

export function toast({ title = '', iconType, duration = 2000, zIndex, onClose = () => {} }) {
  const shareMounter = window.PROMISE_DIALOG_CONFIG.PROMISE_DIALOG_SHARE_MOUNTER
  if (!shareMounter) {
    return Promise.resolve()
  }

  clear()

  const toaster = create('div', ['toast'], {
    style: zIndex ? { zIndex } : undefined,
  })
  const titleNode = create('h3', ['title'], {
    textContent: title,
  })

  if (iconType && IconTypes[iconType]) {
    const icon = $e('span', $class('icon'))
    icon.dataset.icon = iconType
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

  const loader = create('div', ['loading'])
  if (z) {
    loader.style.zIndex = z
  }

  if (text) {
    const title = create('h3', ['title'])
    title.textContent = text
    loader.appendChild(title)
  }

  shareMounter.appendChild(loader)
  document.body.appendChild(shareMounter)
}

export function loaded() {
  clear()
}

// ssr
if (typeof window !== 'undefined') {
  if (!window.PROMISE_DIALOG_CONFIG || !('okText' in window.PROMISE_DIALOG_CONFIG)) {
    window.PROMISE_DIALOG_CONFIG = {
      ...PROMISE_DIALOG_CONFIG,
    }
  }

  if (!window.PROMISE_DIALOG_CONFIG.PROMISE_DIALOG_SHARE_MOUNTER) {
    window.PROMISE_DIALOG_CONFIG.PROMISE_DIALOG_SHARE_MOUNTER = $e('div', $class('mounter'))
  }
}
