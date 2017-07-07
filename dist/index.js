/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var keys = Object.keys,
    assign = Object.assign;

var isPlainObject = __webpack_require__(1);
var is = __webpack_require__(3);

var defaultPassThrough = ['id', 'className', 'events', 'attributes', 'style', 'hooks', 'data'];

function HyperFela(_ref) {
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
}

function isType(value) {
  return is.string(value) || is.function(value);
}

function defined(a, b) {
  return !is.undefined(a) ? a : b;
}

module.exports = HyperFela;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(2);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
[
  'boolean',
  'function',
  'number',
  'object',
  'string',
  'symbol',
  'undefined'
].forEach(function (type) {
  exports[type] = isTypeOf(type)
})

function isTypeOf (type) {
  return function (value) {
    return typeof value === type
  }
}


/***/ })
/******/ ]);