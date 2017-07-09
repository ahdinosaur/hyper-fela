'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var keys = Object.keys,
    assign = Object.assign;

var isPlainObject = require('is-plain-object');
var is = require('typeof-is');

var defaultPassThrough = ['id', 'className', 'events', 'attributes', 'style', 'hooks', 'data'];

module.exports = function HyperFela(_ref) {
  var h = _ref.h,
      renderRule = _ref.renderRule;

  assign(createStyledElement, {
    createStyledElement: createStyledElement,
    connectStyles: connectStyles
  });

  return createStyledElement;

  function createStyledElement(type, rule, options) {
    if (!isType(type)) {
      options = rule;
      rule = type;
      type = 'div';
    }

    options = defined(options, {});
    var _options = options,
        _options$passThrough = _options.passThrough,
        ctorPassThrough = _options$passThrough === undefined ? [] : _options$passThrough;


    if (is.object(rule)) {
      var style = rule;
      rule = function rule() {
        return style;
      };
    }

    return StyledElement;

    function StyledElement(properties, children) {
      if (!isPlainObject(properties)) {
        children = properties;
        properties = {};
      }

      var _properties = properties,
          _properties$passThrou = _properties.passThrough,
          instPassThrough = _properties$passThrou === undefined ? [] : _properties$passThrou;


      var passThrough = [].concat(defaultPassThrough, _toConsumableArray(ctorPassThrough), _toConsumableArray(instPassThrough));

      var elementProperties = passThrough.reduce(function (sofar, key) {
        var value = properties[key];
        if (!is.undefined(value)) sofar[key] = properties[key];
        return sofar;
      }, {});

      var tagName = defined(properties.is, type);
      var element = is.string(tagName) ? h(tagName, elementProperties, children) : type(elementProperties, children);

      var className = renderRule(rule, properties);

      // TODO should we handle if el is a string?
      // we could use createTextNode
      if (className) {
        var classNames = className.split(' ');
        classNames.forEach(function (c) {
          return element.classList.add(c);
        });
      }

      return element;
    }
  }

  function connectStyles(mapStylesToProps, Element) {
    return function StyledElement(properties, children) {
      var styles = mapStylesToProps(properties)(renderRule);
      keys(styles).forEach(function (key) {
        if (is.function(styles[key])) {
          // if style is rule, render rule with element properties
          styles[key] = renderRule(styles[key], properties);
        } else if (is.object(styles[key])) {
          // if style is object, render rule to return object
          styles[key] = renderRule(function () {
            return styles[key];
          });
        }
      });
      properties = assign({}, properties, { styles: styles });
      return Element(properties, children);
    };
  }
};

function isType(value) {
  return is.string(value) || is.function(value);
}

function defined(a, b) {
  return !is.undefined(a) ? a : b;
}
