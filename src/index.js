import './style.css'

const DefaultConfig = {
  okText: 'OK',
  cancelText: 'Cancel',
}

if (!window.__pd_config || !('okText' in window)) {
  window.__pd_config = {
    ...DefaultConfig,
  }
}

export function setConfig({ okText, cancelText }) {
  if (!('__pd_config' in window)) {
    window.__pd_config = { ...DefaultConfig }
  }
  if (okText) {
    window.__pd_config.okText = okText
  }
  if (cancelText) {
    window.__pd_config.cancelText = cancelText
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
  buttonText = window.__pd_config.okText,
  zIndex,
}) {
  const button = create('button', ['button'], {
    textContent: buttonText,
  })
  const mounter = createWrapper(theme, createHeader({ title, content, html }), [button], zIndex)
  document.body.appendChild(mounter)

  return new Promise(function alertPromise(resolve) {
    button.addEventListener('click', function removeAlert() {
      document.body.removeChild(mounter)
      resolve()
    })
  })
}

export function confirm({
  theme,
  title = '',
  content = '',
  html = '',
  leftText = window.__pd_config.cancelText,
  rightText = window.__pd_config.okText,
  leftCancel = true,
  zIndex,
}) {
  const [leftButton, rightButton] = createActions(leftText, rightText, leftCancel)

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
        reject()
      } else {
        resolve()
      }
    })

    rightButton.addEventListener('click', function rightClick() {
      document.body.removeChild(mounter)
      if (leftCancel) {
        resolve()
      } else {
        reject()
      }
    })
  })
}

export function prompt({
  theme,
  title = '',
  placeholder = '',
  defaultValue = '',
  leftText = window.__pd_config.cancelText,
  rightText = window.__pd_config.okText,
  leftCancel = true,
  zIndex,
  onBlur = () => {},
}) {
  const [leftButton, rightButton] = createActions(leftText, rightText, leftCancel)
  const textarea = create('textarea', ['textarea'], {
    placeholder: placeholder || title || '',
    rows: 3,
  })
  const mounter = createWrapper(
    theme,
    [...createHeader({ title }), create('div', ['control'], null, [textarea])],
    [leftButton, rightButton],
    zIndex
  )
  document.body.appendChild(mounter)

  textarea.value = defaultValue
  textarea.focus()

  textarea.addEventListener('blur', onBlur)

  return new Promise(function confirmPromise(resolve, reject) {
    leftButton.addEventListener('click', function leftClick() {
      if (leftCancel) {
        reject()
      } else {
        resolve(textarea.value)
      }
      document.body.removeChild(mounter)
    })

    rightButton.addEventListener('click', function rightClick() {
      if (leftCancel) {
        resolve(textarea.value)
      } else {
        reject()
      }
      document.body.removeChild(mounter)
    })
  })
}

const IconTypes = {
  success: 'success',
  warn: 'warn',
}

const shareMounter = $e('div', $class('mounter'))
let toastTimer

function clear() {
  if (shareMounter.parentNode === document.body) {
    clearTimeout(toastTimer)
    document.body.removeChild(shareMounter)
    if (shareMounter.firstChild) {
      shareMounter.removeChild(shareMounter.firstChild)
    }
  }
}

export function toast({ title = '', iconType, duration = 2000, zIndex }) {
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
    toastTimer = setTimeout(() => {
      resolve()
      clear()
    }, duration)
  })
}

export function loading(config) {
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
