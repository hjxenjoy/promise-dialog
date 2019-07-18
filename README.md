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

async function testAlert() {
  await pd.alert({
    title: 'Hello Alert',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    html: `<h3>Heading 3</h3><p>paragraph</p><button>click button</button><script type="text/javascript">alert('script')</script>`,
    buttonText: 'Sure!',
  })
  // eslint-disable-next-line no-console
  console.log('alert clicked')
}

async function testConfirm() {
  await pd.confirm({
    title: 'Hello Confirm',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    html: `<h3>Heading 3</h3><p>paragraph</p><button>click button</button><script type="text/javascript">alert('script')</script>`,
  })
  // eslint-disable-next-line no-console
  console.log('confirm ok')
}

async function testPrompt() {
  const value = await pd.prompt({
    title: 'Hello Prompt',
    placeholder: 'Please typo something...',
  })
  // eslint-disable-next-line no-console
  console.log(value)
}

async function testToast() {
  await pd.toast({ title: 'Hello Toast', iconType: 'success' })
  // eslint-disable-next-line no-console
  console.log('toast disappear')
}

function testLoading() {
  pd.loading({ title: 'Loading...' })
}

function testLoaded() {
  pd.loaded()
}
```
