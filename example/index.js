import './main.css'

import * as pd from '../src'

const example = document.getElementById('example')

pd.setConfig({ okText: 'Sure', cancelText: 'Dismiss' })

function testAlert(theme) {
  pd.alert({
    theme,
    title: 'Hello Dark Mode Alert',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    html: `<h3>Heading 3</h3><p>paragraph</p><button>click button</button><script type="text/javascript">alert('script')</script>`,
    buttonText: 'Sure!',
  }).then(() => {
    console.log('alert clicked')
  })
}

function testConfirm() {
  pd.confirm({
    title: 'Hello Confirm',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    html: `<h3>Heading 3</h3><p>paragraph</p><button>click button</button><script type="text/javascript">alert('script')</script>`,
  }).then(() => {
    console.log('confirm ok')
  })
}

function testPrompt() {
  pd.prompt({
    title: 'Hello Prompt',
    placeholder: 'Please typo something...',
    defaultValue: 'Default Values...',
    onBlur: pd.scrollBack,
  }).then(value => {
    console.log(value)
  })
}

function testToast() {
  pd.toast({ title: 'Hello Toast', iconType: 'success' }).then(() => {
    console.log('toast disappear')
  })
}

function testLoading() {
  pd.loading({ title: 'Loading...' })
}

function testLoaded() {
  pd.loaded()
}

example.addEventListener('click', event => {
  const { func } = event.target.dataset

  switch (func) {
    case 'alert':
      testAlert()
      break
    case 'alert2':
      testAlert('dark')
      break
    case 'confirm':
      testConfirm()
      break
    case 'prompt':
      testPrompt()
      break
    case 'toast':
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
