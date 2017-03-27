const { keys, assign } = Object
const isPlainObject = require('is-plain-object')
const is = require('typeof-is')

const defaultPassThrough = [
  'id',
  'className',
  'events',
  'attributes',
  'style',
  'hooks',
  'data'
]

module.exports = HyperFela

function HyperFela ({ h, renderRule }) {
  assign(createStyledElement, {
    createStyledElement,
    connectStyles
  })

  return createStyledElement

  function createStyledElement (type, rule, options) {
    if (!isType(type)) {
      options = rule
      rule = type
      type = 'div'
    }

    options = defined(options, {})
    const {
      passThrough: ctorPassThrough = []
    } = options

    if (is.object(rule)) {
      const style = rule
      rule = () => style
    }

    return StyledElement

    function StyledElement (properties, children) {
      if (!isPlainObject(properties)) {
        children = properties
        properties = {}
      }

      const {
        passThrough: instPassThrough = []
      } = properties
      const tagName = defined(properties.is, type)

      var element
      if (is.string(tagName)) {
        const passThrough = [
          ...defaultPassThrough,
          ...ctorPassThrough,
          ...instPassThrough
        ]

        const tagProperties = passThrough
        .reduce((sofar, key) => {
          const value = properties[key]
          if (!is.undefined(value)) sofar[key] = properties[key]
          return sofar
        }, {})

        element = h(tagName, tagProperties, children)
      } else {
        element = type(properties, children)
      }

      const className = renderRule(rule, properties)

      // TODO should we handle if el is a string?
      // we could use createTextNode
      if (className) {
        const classNames = className.split(' ')
        classNames.forEach(c => element.classList.add(c))
      }

      return element
    }
  }

  function connectStyles (mapStylesToProps, Element) {
    return function StyledElement (properties, children) {
      var styles = mapStylesToProps(properties)(renderRule)
      keys(styles).forEach(key => {
        if (is.function(styles[key])) {
          // if style is rule, render rule with element properties
          styles[key] = renderRule(styles[key], properties)
        } else if (is.object(styles[key])) {
          // if style is object, render rule to return object
          styles[key] = renderRule(() => styles[key])
        }
      })
      properties = assign({}, properties, { styles })
      return Element(properties, children)
    }
  }
}

function isType (value) {
  return is.string(value) || is.function(value)
}

function defined (a, b) {
  return (!is.undefined(a)) ? a : b
}
