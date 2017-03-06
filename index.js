module.exports = HyperFela

function HyperFela ({ h, renderRule }) {
  return createStyledElement

  function createStyledElement (type, rule) {
    if (rule === undefined) {
      rule = type
      type = 'div'
    }

    return StyledElement

    function StyledElement (properties, children) {
      if (typeof type === 'string') {
        var el = h(type, properties, children)
      } else {
        var el = type(properties, children)
      }

      const className = renderRule(rule, properties)

      // TODO should we handle if el is a string?
      // we could use createTextNode
      el.classList.add(className)

      return el
    }
  }
}
