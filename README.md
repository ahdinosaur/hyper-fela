# hyper-fela

hyperscript-style bindings for Fela

```shell
npm install --save hyper-fela
```

## example

```js
const hyperFela = require('hyper-fela')
const h = require('hyps')
const { createRenderer } = require('fela')
const { render } = require('fela-dom')

// intialize renderer
const renderer = createRenderer()
const { renderRule } = renderer

// setup stylesheet render
const stylesheet = document.createElement('style')
document.head.appendChild(stylesheet)
render(renderer, stylesheet)

// create styled element creator
const createStyledElement = hyperFela({ h, renderRule })

// create some styled elements!

const GreenSpan = createStyledElement('span', props => ({
  color: 'green'
}))

const Button = createStyledElement((props, children) => {
  return h('h1', {
    events: {
      click: (ev) => console.log('clicked!')
    }
  }, children)
}, props => ({
  fontWeight: 'bold'
}))

// render all the things
const button = Button({}, [
  GreenSpan({}, [
    'click me!'
  ])
])
document.body.appendChild(button)
```

## usage

### `hyperFela = require('hyper-fela')`

### `createStyledElement = hyperFela({ h, renderRule })`

### `Element = createStyleElement(type, rule, options)`

### `element = Element(properties, children)`

## license

The Apache License

Copyright &copy; 2017 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
