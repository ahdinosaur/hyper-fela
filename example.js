const hyperFela = require('./index')
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
