import './style.css'

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

export function alert({ title = '', content = '', buttonText = 'OK', zIndex }) {
  const mounter = $e('div', $class('mounter'))
  const layer = $e('div', $class('layer'))
  const dialog = $e('div', $class('dialog'))
  const body = $e('div', $class('body'))
  const titler = $e('h3', $class('title'))
  const contenter = $e('div', $class('content'))
  const actions = $e('div', $class('actions'))
  const button = $e('button', $class('button'))
  button.textContent = buttonText

  titler.textContent = title
  body.appendChild(titler)
  if (content) {
    contenter.textContent = content
    body.appendChild(contenter)
  }
  actions.appendChild(button)
  dialog.appendChild(body)
  dialog.appendChild(actions)
  if (zIndex) {
    layer.style.zIndex = zIndex
  }
  layer.appendChild(dialog)
  mounter.appendChild(layer)

  document.body.appendChild(mounter)

  return new Promise(function alertPromise(resolve) {
    button.addEventListener('click', function removeAlert() {
      document.body.removeChild(mounter)
      resolve()
    })
  })
}

export function confirm({
  title = '',
  content = '',
  leftText = 'Cancel',
  rightText = 'OK',
  leftCancel = true,
  zIndex,
}) {
  const mounter = $e('div', $class('mounter'))
  const layer = $e('div', $class('layer'))
  const dialog = $e('div', $class('dialog'))
  const body = $e('div', $class('body'))
  const titler = $e('h3', $class('title'))
  const contenter = $e('div', $class('content'))
  const actions = $e('div', $class('actions'))
  const leftButton = $e('button', $class('button', leftCancel ? 'cancel' : ''))
  const rightButton = $e('button', $class('button', leftCancel ? '' : 'cancel'))
  leftButton.textContent = leftText
  rightButton.textContent = rightText

  titler.textContent = title
  body.appendChild(titler)
  if (content) {
    contenter.textContent = content
    body.appendChild(contenter)
  }
  actions.appendChild(leftButton)
  actions.appendChild(rightButton)
  dialog.appendChild(body)
  dialog.appendChild(actions)
  if (zIndex) {
    layer.style.zIndex = zIndex
  }
  layer.appendChild(dialog)
  mounter.appendChild(layer)

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

const IconTypes = {
  success: 'success',
  warn: 'warn',
}

const shareMounter = $e('div', $class('mounter'))
let toastTimer

export function toast({ title = '', iconType, duration = 2000, zIndex }) {
  if (shareMounter.parentNode === document.body) {
    shareMounter.innerHTML = ''
    clearTimeout(toastTimer)
  }

  const toaster = $e('div', $class('toast'))
  if (zIndex) {
    toaster.style.zIndex = zIndex
  }
  const titler = $e('h3', $class('title'))

  if (iconType && IconTypes[iconType]) {
    const icon = $e('span', $class('icon'))
    icon.dataset.icon = iconType
    toaster.appendChild(icon)
  }

  titler.textContent = title
  toaster.appendChild(titler)
  shareMounter.appendChild(toaster)

  document.body.appendChild(shareMounter)

  return new Promise(function toastPromise(resolve) {
    toastTimer = setTimeout(() => {
      if (shareMounter.parentNode === document.body) {
        document.body.removeChild(shareMounter)
        resolve()
      }
    }, duration)
  })
}

export function loading({ title = '', zIndex }) {
  if (shareMounter.parentNode === document.body) {
    shareMounter.innerHTML = ''
    clearTimeout(toastTimer)
  }

  const loader = $e('div', $class('loading'))
  if (zIndex) {
    loader.style.zIndex = zIndex
  }

  if (title) {
    const titler = $e('h3', $class('title'))
    titler.textContent = title
    loader.appendChild(titler)
  }

  shareMounter.appendChild(loader)
  document.body.appendChild(shareMounter)
}

export function loaded() {
  if (shareMounter.parentNode === document.body) {
    shareMounter.innerHTML = ''
    clearTimeout(toastTimer)
  }

  document.body.appendChild(shareMounter)
}
