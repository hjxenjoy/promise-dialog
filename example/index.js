import './main.css'

import * as pd from '../src'

const example = document.getElementById('example')

let isDark = localStorage.getItem('dark-mode') === 'true'

if (isDark) {
  document.body.classList.add('dark')
}

pd.setConfig({ okText: 'Sure', cancelText: 'Dismiss' })

function testAlert(isAsync) {
  const props = {
    theme: isDark ? 'dark' : undefined,
    title: 'Hello Dark Mode Alert',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    html: `<h3>Heading 3</h3><p>paragraph</p><button>click button</button><script type="text/javascript">alert('script')</script>`,
    buttonText: 'Sure!',
  }
  const onClose = () => {
    console.log('alert clicked')
  }

  if (isAsync) {
    pd.alert(props).then(onClose)
  } else {
    pd.syncAlert({ onClose, ...props })
  }
}

function testConfirm(isAsync) {
  const props = {
    theme: isDark ? 'dark' : undefined,
    title: 'Hello Confirm',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    html: `<h3>Heading 3</h3><p>paragraph</p><button>click button</button><script type="text/javascript">alert('script')</script>`,
  }
  const onOk = () => console.log('confirm ok')
  const onCancel = () => console.log('confirm cancel')
  if (isAsync) {
    pd.confirm(props)
      .then(onOk)
      .catch(onCancel)
  } else {
    pd.syncConfirm({ onOk, onCancel, ...props })
  }
}

function testPrompt(isAsync) {
  const props = {
    theme: isDark ? 'dark' : undefined,
    title: 'Hello Prompt',
    placeholder: 'Please typo something...',
    defaultValue: 'Default Values...',
    onBlur: pd.scrollBack,
  }
  const onOk = value => console.log(value)
  const onCancel = () => console.log('prompt cancel')

  if (isAsync) {
    pd.prompt(props)
      .then(onOk)
      .catch(onCancel)
  } else {
    pd.syncPrompt({ onOk, onCancel, ...props })
  }
}

function testToast(isAsync) {
  const props = {
    theme: isDark ? 'dark' : undefined,
    title: 'Hello Toast',
    iconType: 'success',
  }
  const onClose = () => console.log('toast disappear')
  if (isAsync) {
    pd.toast(props).then(onClose)
  } else {
    pd.syncToast({ onClose, ...props })
  }
}

function testLoading() {
  pd.loading({ title: 'Loading...' })
}

function testLoaded() {
  pd.loaded()
}

function toggleDarkMode() {
  if (isDark) {
    document.body.classList.remove('dark')
    isDark = false
    localStorage.removeItem('dark-mode')
  } else {
    document.body.classList.add('dark')
    isDark = true
    localStorage.setItem('dark-mode', 'true')
  }
}

example.addEventListener('click', event => {
  const { func } = event.target.dataset

  switch (func) {
    case 'toggle':
      toggleDarkMode()
      break
    case 'alert':
      testAlert(true)
      break
    case 'syncAlert':
      testAlert()
      break
    case 'confirm':
      testConfirm(true)
      break
    case 'syncConfirm':
      testConfirm()
      break
    case 'prompt':
      testPrompt(true)
      break
    case 'syncPrompt':
      testPrompt()
      break
    case 'toast':
      testToast(true)
      break
    case 'syncToast':
      testToast()
      break
    case 'loading':
      testLoading()
      break
    case 'loaded':
      testLoaded()
      break
    default:
      break
  }
})
