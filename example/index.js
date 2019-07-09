import './main.css'

import * as pd from '../src'

const example = document.getElementById('example')

async function testAlert() {
  await pd.alert({
    title: 'Hello Alert',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    buttonText: 'Sure!',
  })
  // eslint-disable-next-line
  console.log('alert clicked')
}

async function testConfirm() {
  await pd.confirm({
    title: 'Hello Confirm',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  })
  // eslint-disable-next-line
  console.log('confirm ok')
}

async function testToast() {
  await pd.toast({ title: 'Hello Toast', iconType: 'success' })
  // eslint-disable-next-line
  console.log('toast disappear')
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
    case 'confirm':
      testConfirm()
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
