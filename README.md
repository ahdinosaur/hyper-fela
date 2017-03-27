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
const button = Button([
  GreenSpan([
    'click me!'
  ])
])
document.body.appendChild(button)
```

## usage

### `hyperFela = require('hyper-fela')`

### `createStyledElement = hyperFela({ h, renderRule })`

`h` is a `hyperscript`-compatible function of shape `(tagName, properties, children) => HTMLElment`.

`renderRule` is `fela.createRenderer().renderRule`.

### `Element = createStyleElement([type], rule, [options])`

(optional) `type` is either:

- a [`tagName` string like 'div'](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName)
- a function of shape `(properties, children) => h(...)`

`rule` is either:

- a `fela` rule (function that returns a style object)
- a style object

(optional) `options` is object with keys:

- `passThrough`: a list of props that get passed to the underlying element.

### `element = Element([properties], [children])`

### `passThrough props`

using the `passThrough` parameter allows us to pass propertiess to the underlying DOM element. this is helpful if you want to pass e.g. `events` such as `events.click`. there are some props that are automatically passed and thus do not need to be specified explicitly:

- `className`
- `id`
- `className`
- `events`
- `attributes`
- `style`
- `hooks`
- `data`

if passing a `className`, it will automatically be concatenated with the Fela generated className. this allows composing multiple Fela elements.

### dynamically passing props

this use case is especially important for library owners. instead of passing the `passThrough` props to the `createStyleElement` call directly, one can also use the `passThrough` prop on the created element constructor to achieve the same effect.

#### example

```js
const title = props => ({
  color: 'red'
})

const Title = createStyleElement(title)

const greet = () => alert('Hello World')

const element = Title({ events: { click: greet } }, 'Hello World')
// => <div className="a" onclick="...">Hello World</div>
```

## custom type on runtime

to change the `type` on runtime and/or for each component, you may use the `is` prop.

```js
const title = props => ({
  color: 'red'
})

const Title = createStyleElement(title)

const element = Title({ is: 'h1' }, 'Hello World')
// => <h1 className="a">Hello World</h1>
```


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
