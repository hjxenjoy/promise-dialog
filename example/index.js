import './main.css'
import './tailwind.css'

import * as pd from '../src'

const example = document.getElementById('example')

let isDark = localStorage.getItem('dark-mode') === 'true'

if (isDark) {
  document.documentElement.classList.add('dark')
}

pd.setConfig({ okText: 'Sure', cancelText: 'Dismiss' })

const html = `<div style="background-color: #eee;padding: 8px 0;">
  <h3>HTML Content is OK!</h3>
  <p>paragraph</p>
  <button class="mt-1 font-medium px-2 py-0.5 text-green-600 border border-green-500 rounded text-sm uppercase">click button</button>
  <script type="text/javascript">alert('script')</script>
</div>`

// see customize css usage? open below code
const customizeClasses = {
  root: 'text-base text-gray-800',
  button:
    'relative flex-1 flex items-center justify-center h-12 bg-transparent focus:outline-none focus:ring focus:ring-inset focus:ring-green-400',
  okButton: 'text-green-600',
  cancelButton:
    'text-gray-500 before:absolute before:top-3 before:right-0 before:h-6 before:w-px before:border-l before:border-l-gray-200',
  title: 'text-center font-medium break-words leading-7',
  content: 'mt-2 text-gray-500 text-sm break-words text-center leading-6',
  html: 'mt-2 text-sm break-words',
  layer:
    'fixed inset-0 z-[1000] flex flex-col items-center justify-center p-4 bg-black bg-opacity-50',
  dialog: 'w-full max-w-xs bg-white overflow-hidden rounded-md shadow',
  body: 'p-5 text-center',
  actions: 'flex border-t border-1 border-gray-300',
  input:
    'w-full border border-gray-300 px-2 py-1 rounded placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400',
  textarea: 'resize-none',
  control: 'mt-2 min-w-[16rem]',
  loading:
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] px-5 py-6 rounded-md bg-black/50 text-white flex flex-col items-center justify-center',
  loadingIcon: 'w-9 h-9 animate-spin',
  toast:
    'fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000] p-5 flex flex-col items-center justify-center bg-black/50 rounded-md text-white',
  toastIcon: 'w-9 h-9',
}

pd.setConfig({
  classes: customizeClasses,
})

function testAlert(isAsync) {
  const props = {
    theme: isDark ? 'pd-dark' : undefined,
    title: `Hello${isDark ? ' Dark Mode' : ''} Alert`,
    content: `This is a${isDark ? ' Dark Mode' : ''} alert content.`,
    html,
    buttonText: 'Sure!',
    onClose() {
      console.log('alert closed')
    },
  }
  if (isAsync) {
    pd.alert(props).then()
  } else {
    pd.syncAlert(props)
  }
}

function testConfirm(isAsync) {
  const props = {
    theme: isDark ? 'pd-dark' : undefined,
    title: 'Hello Confirm',
    content: 'This is a confirm content.',
    html,
    onOk() {
      console.log('confirm ok')
    },
    onCancel() {
      console.log('confirm cancel')
    },
  }
  if (isAsync) {
    pd.confirm(props).then()
  } else {
    pd.syncConfirm(props)
  }
}

function testPrompt(isAsync, useInput = false) {
  const props = {
    theme: isDark ? 'pd-dark' : undefined,
    title: 'Hello Prompt',
    placeholder: `Please Enter (in ${useInput ? 20 : 50} characters)`,
    defaultValue: useInput ? '' : 'Default Values...',
    maxLength: useInput ? 20 : 50,
    useInput,
    onBlur() {
      pd.scrollBack(0, 0)
    },
    onOk(value) {
      console.log(value)
    },
    onCancel() {
      console.log('prompt cancel')
    },
  }

  if (isAsync) {
    pd.prompt(props).then()
  } else {
    pd.syncPrompt(props)
  }
}

function testToast(isAsync, iconType = 'success') {
  const props = {
    theme: isDark ? 'pd-dark' : undefined,
    title: 'Hello Toast',
    iconType,
    onClose() {
      console.log('toast disappear')
    },
  }
  if (isAsync) {
    pd.toast(props).then()
  } else {
    pd.syncToast(props)
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
    document.documentElement.classList.remove('dark')
    isDark = false
    localStorage.removeItem('dark-mode')
  } else {
    document.documentElement.classList.add('dark')
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
    case 'prompt1':
      testPrompt(true)
      break
    case 'syncPrompt1':
      testPrompt()
      break
    case 'prompt2':
      testPrompt(true, true)
      break
    case 'syncPrompt2':
      testPrompt(false, true)
      break
    case 'toast':
      testToast(true)
      break
    case 'syncToast':
      testToast(false, 'warn')
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
