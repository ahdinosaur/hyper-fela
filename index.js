const isPlainObject = require('is-plain-object')
const is = require('typeof-is')

module.exports = HyperFela

function HyperFela ({ h, renderRule }) {
  return createStyledElement

  function createStyledElement (type, rule) {
    if (!isType(type)) {
      rule = type
      type = 'div'
    }

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

      const element = is.string(type)
        ? h(type, properties, children)
        : type(properties, children)

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
}

function isType (value) {
  return is.string(value) || is.function(value)
}
