# Promise Dialog

Promise Based Dialog

## Demo

```sh
npm start
```

## Installation

Using [npm](https://www.npmjs.com/package/react-text-media-editor):

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
    buttonText: 'Sure!',
  })
  console.log('alert clicked')
}

async function testConfirm() {
  await pd.confirm({
    title: 'Hello Confirm',
    content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit.',
  })
  console.log('confirm ok')
}

async function testToast() {
  await pd.toast({ title: 'Hello Toast', iconType: 'warn' })
  console.log('toast disappear')
}

function testLoading() {
  pd.loading({ title: 'Loading...' })
}

function testLoaded() {
  pd.loaded()
}
```
