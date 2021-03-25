# Promise Dialog

Promise Based Dialog

## Demo

```sh
npm start
```

## Installation

Using [npm](https://www.npmjs.com/package/promise-dialog):

```sh
npm install --save promise-dialog
```

## Usage

Basic Example

```js
import * as pd from 'promise-dialog'

pd.setConfig({ okText: 'Sure', cancelText: 'Dismiss' })

const isDark = false

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

function testPrompt(isAsync, useInput = false) {
  const props = {
    theme: isDark ? 'dark' : undefined,
    title: 'Hello Prompt',
    placeholder: 'Please typo something...',
    defaultValue: 'Default Values...',
    onBlur: pd.scrollBack,
    useInput,
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
```
