import './style.css'

const DefaultConfig = {
  okText: 'OK',
  cancelText: 'Cancel',
}

// eslint-disable-next-line no-restricted-globals,no-undef
const win = typeof window !== 'undefined' ? window : {}

// ssr
if (typeof win !== 'undefined' && (!win.__pd_config || !('okText' in win.__pd_config))) {
  win.__pd_config = {
    ...DefaultConfig,
  }
}

export function setConfig({ okText, cancelText }) {
  if (!('__pd_config' in win)) {
    win.__pd_config = { ...DefaultConfig }
  }
  if (okText) {
    win.__pd_config.okText = okText
  }
  if (cancelText) {
    win.__pd_config.cancelText = cancelText
  }
}

export function scrollBack(x = 0, y = 0) {
  if (typeof win.scrollTo === 'function') {
    win.scrollTo(x, y)
  } else {
    win.scrollLeft = x
    win.scrollTop = y
  }
}

function $e(tagName, className) {
  const element = win.document.createElement(tagName)
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
  buttonText = win.__pd_config.okText,
  zIndex,
}) {
  if (!('document' in win)) {
    console.log('window is required.')
    return Promise.resolve()
  }
  const button = create('button', ['button'], {
    textContent: buttonText,
  })
  const mounter = createWrapper(theme, createHeader({ title, content, html }), [button], zIndex)
  win.document.body.appendChild(mounter)

  return new Promise(function alertPromise(resolve) {
    button.addEventListener('click', function removeAlert() {
      win.document.body.removeChild(mounter)
      resolve()
    })
  })
}

export function syncAlert({ onClose = () => {}, ...alertProps }) {
  if (!('document' in win)) {
    console.log('window is required.')
    return
  }
  alert(alertProps).then(onClose)
}

export function confirm({
  theme,
  title = '',
  content = '',
  html = '',
  leftText = win.__pd_config.cancelText,
  rightText = win.__pd_config.okText,
  leftCancel = true,
  zIndex,
}) {
  if (!('document' in win)) {
    console.log('window is required.')
    return Promise.resolve()
  }
  const [leftButton, rightButton] = createActions(leftText, rightText, leftCancel)

  const mounter = createWrapper(
    theme,
    createHeader({ title, content, html }),
    [leftButton, rightButton],
    zIndex
  )
  win.document.body.appendChild(mounter)

  return new Promise(function confirmPromise(resolve, reject) {
    leftButton.addEventListener('click', function leftClick() {
      win.document.body.removeChild(mounter)
      if (leftCancel) {
        reject()
      } else {
        resolve()
      }
    })

    rightButton.addEventListener('click', function rightClick() {
      win.document.body.removeChild(mounter)
      if (leftCancel) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

export function syncConfirm({ onCancel = () => {}, onOk = () => {}, ...confirmProps }) {
  if (!('document' in win)) {
    console.log('window is required.')
    return
  }
  confirm(confirmProps)
    .then(onOk)
    .catch(onCancel)
}

export function prompt({
  theme,
  title = '',
  placeholder = '',
  defaultValue = '',
  leftText = win.__pd_config.cancelText,
  rightText = win.__pd_config.okText,
  leftCancel = true,
  useInput = false,
  zIndex,
  onBlur = () => {},
}) {
  if (!('document' in win)) {
    console.log('window is required.')
    return Promise.resolve()
  }

  const [leftButton, rightButton] = createActions(leftText, rightText, leftCancel)
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
  win.document.body.appendChild(mounter)

  input.value = defaultValue
  input.focus()

  input.addEventListener('blur', onBlur)

  return new Promise(function confirmPromise(resolve, reject) {
    leftButton.addEventListener('click', function leftClick() {
      if (leftCancel) {
        reject()
      } else {
        resolve(input.value)
      }
      win.document.body.removeChild(mounter)
    })

    rightButton.addEventListener('click', function rightClick() {
      if (leftCancel) {
        resolve(input.value)
      } else {
        reject()
      }
      win.document.body.removeChild(mounter)
    })
  })
}

export function syncPrompt({ onCancel = () => {}, onOk = () => {}, ...promptProps }) {
  if (!('document' in win)) {
    console.log('window is required.')
    return
  }
  prompt(promptProps)
    .then(onOk)
    .catch(onCancel)
}

const IconTypes = {
  success: 'success',
  warn: 'warn',
}

const shareMounter = $e('div', $class('mounter'))
let toastTimer

function clear() {
  if (!('document' in win)) {
    console.log('window is required.')
    return
  }
  if (shareMounter.parentNode === win.document.body) {
    clearTimeout(toastTimer)
    win.document.body.removeChild(shareMounter)
    if (shareMounter.firstChild) {
      shareMounter.removeChild(shareMounter.firstChild)
    }
  }
}

export function toast({ title = '', iconType, duration = 2000, zIndex }) {
  if (!('document' in win)) {
    console.log('window is required.')
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

  win.document.body.appendChild(shareMounter)

  return new Promise(function toastPromise(resolve) {
    toastTimer = setTimeout(() => {
      resolve()
      clear()
    }, duration)
  })
}

export function syncToast({ onClose = () => {}, ...toastProps }) {
  if (!('document' in win)) {
    console.log('window is required.')
    return
  }
  toast(toastProps).then(onClose)
}

export function loading(config) {
  if (!('document' in win)) {
    console.log('window is required.')
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
  win.document.body.appendChild(shareMounter)
}

export function loaded() {
  clear()
}
