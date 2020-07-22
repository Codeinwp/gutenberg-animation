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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/data.js":
/*!*********************!*\
  !*** ./src/data.js ***!
  \*********************/
/*! exports provided: animationsList, outAnimation, delayList, speedList */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"animationsList\", function() { return animationsList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"outAnimation\", function() { return outAnimation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"delayList\", function() { return delayList; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"speedList\", function() { return speedList; });\n/**\r\n * WordPress dependencies.\r\n */\nvar __ = wp.i18n.__;\nvar animationsList = [{\n  label: __('None'),\n  value: 'none'\n}, {\n  label: __('Bounce'),\n  value: 'bounce'\n}, {\n  label: __('Bounce In'),\n  value: 'bounceIn'\n}, {\n  label: __('Bounce In Down'),\n  value: 'bounceInDown'\n}, {\n  label: __('Bounce In Left'),\n  value: 'bounceInLeft'\n}, {\n  label: __('Bounce In Right'),\n  value: 'bounceInRight'\n}, {\n  label: __('Bounce In Up'),\n  value: 'bounceInUp'\n}, {\n  label: __('Bounce Out'),\n  value: 'bounceOut'\n}, {\n  label: __('Bounce Out Down'),\n  value: 'bounceOutDown'\n}, {\n  label: __('Bounce Out Left'),\n  value: 'bounceOutLeft'\n}, {\n  label: __('Bounce Out Right'),\n  value: 'bounceOutRight'\n}, {\n  label: __('Bounce Out Up'),\n  value: 'bounceOutUp'\n}, {\n  label: __('Fade In'),\n  value: 'fadeIn'\n}, {\n  label: __('Fade In Down'),\n  value: 'fadeInDown'\n}, {\n  label: __('Fade In Down Big'),\n  value: 'fadeInDownBig'\n}, {\n  label: __('Fade In Left'),\n  value: 'fadeInLeft'\n}, {\n  label: __('Fade In Left Big'),\n  value: 'fadeInLeftBig'\n}, {\n  label: __('Fade In Right'),\n  value: 'fadeInRight'\n}, {\n  label: __('Fade In Right Big'),\n  value: 'fadeInRightBig'\n}, {\n  label: __('Fade In Up'),\n  value: 'fadeInUp'\n}, {\n  label: __('Fade Out'),\n  value: 'fadeOut'\n}, {\n  label: __('Fade Out Down'),\n  value: 'fadeOutDown'\n}, {\n  label: __('Fade Out Down Big'),\n  value: 'fadeOutDownBig'\n}, {\n  label: __('Fade Out Left'),\n  value: 'fadeOutLeft'\n}, {\n  label: __('Fade Out Left Big'),\n  value: 'fadeOutLeftBig'\n}, {\n  label: __('Fade Out Right'),\n  value: 'fadeOutRight'\n}, {\n  label: __('Fade In Left Big'),\n  value: 'fadeOutRightBig'\n}, {\n  label: __('Fade Out Up'),\n  value: 'fadeOutUp'\n}, {\n  label: __('Fade Out Up Big'),\n  value: 'fadeOutUpBig'\n}, {\n  label: __('Flip'),\n  value: 'flip'\n}, {\n  label: __('Flip In X'),\n  value: 'flipInX'\n}, {\n  label: __('Flip In Y'),\n  value: 'flipInY'\n}, {\n  label: __('Flip Out X'),\n  value: 'flipOutX'\n}, {\n  label: __('Flip Out Y'),\n  value: 'flipOutY'\n}, {\n  label: __('Rotate In'),\n  value: 'rotateIn'\n}, {\n  label: __('Rotate In Down Left'),\n  value: 'rotateInDownLeft'\n}, {\n  label: __('Rotate In Down Right'),\n  value: 'rotateInDownRight'\n}, {\n  label: __('Rotate In Up Left'),\n  value: 'rotateInUpLeft'\n}, {\n  label: __('Rotate In Up Right'),\n  value: 'rotateInUpRight'\n}, {\n  label: __('Rotate Out'),\n  value: 'rotateOut'\n}, {\n  label: __('Rotate Out Down Left'),\n  value: 'rotateOutDownLeft'\n}, {\n  label: __('Rotate Out Down Right'),\n  value: 'rotateOutDownRight'\n}, {\n  label: __('Rotate Out Up Left'),\n  value: 'rotateOutUpLeft'\n}, {\n  label: __('Rotate Out Up Right'),\n  value: 'rotateOutUpRight'\n}, {\n  label: __('Slide In Down'),\n  value: 'slideInDown'\n}, {\n  label: __('Slide In Left'),\n  value: 'slideInLeft'\n}, {\n  label: __('Slide In Right'),\n  value: 'slideInRight'\n}, {\n  label: __('Slide In Up'),\n  value: 'slideInUp'\n}, {\n  label: __('Slide Out Down'),\n  value: 'slideOutDown'\n}, {\n  label: __('Slide Out Left'),\n  value: 'slideOutLeft'\n}, {\n  label: __('Slide Out Right'),\n  value: 'slideOutRight'\n}, {\n  label: __('Slide Out Up'),\n  value: 'slideOutUp'\n}, {\n  label: __('Zoom In'),\n  value: 'zoomIn'\n}, {\n  label: __('Zoom In Down'),\n  value: 'zoomInDown'\n}, {\n  label: __('Zoom In Left'),\n  value: 'zoomInLeft'\n}, {\n  label: __('Zoom In Right'),\n  value: 'zoomInRight'\n}, {\n  label: __('Zoom In Up'),\n  value: 'zoomInUp'\n}, {\n  label: __('Zoom Out'),\n  value: 'zoomOut'\n}, {\n  label: __('Zoom Out Down'),\n  value: 'zoomOutDown'\n}, {\n  label: __('Zoom Out Left'),\n  value: 'zoomOutLeft'\n}, {\n  label: __('Zoom Out Right'),\n  value: 'zoomOutRight'\n}, {\n  label: __('Zoom Out Up'),\n  value: 'zoomOutUp'\n}, {\n  label: __('Roll In'),\n  value: 'rollIn'\n}, {\n  label: __('Roll Out'),\n  value: 'rollOut'\n}, {\n  label: __('Light Speed In'),\n  value: 'lightSpeedIn'\n}, {\n  label: __('Light Speed Out'),\n  value: 'lightSpeedOut'\n}, {\n  label: __('Flash'),\n  value: 'flash'\n}, {\n  label: __('Pulse'),\n  value: 'pulse'\n}, {\n  label: __('Rubber Band'),\n  value: 'rubberBand'\n}, {\n  label: __('Shake'),\n  value: 'shake'\n}, {\n  label: __('Head Shake'),\n  value: 'headShake'\n}, {\n  label: __('Swing'),\n  value: 'swing'\n}, {\n  label: __('TaDa'),\n  value: 'tada'\n}, {\n  label: __('Wobble'),\n  value: 'wobble'\n}, {\n  label: __('Jello'),\n  value: 'jello'\n}, {\n  label: __('Heart Beat'),\n  value: 'heartBeat'\n}, {\n  label: __('Hinge'),\n  value: 'hinge'\n}, {\n  label: __('Jack In The Box'),\n  value: 'jackInTheBox'\n}];\nvar outAnimation = ['bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight', 'bounceOutUp', 'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig', 'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flipOutX', 'flipOutY', 'lightSpeedOut', 'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft', 'rotateOutUpRight', 'slideOutDown', 'slideOutLeft', 'slideOutRight', 'slideOutUp', 'zoomOut', 'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'rollOut'];\nvar delayList = [{\n  label: __('None'),\n  value: 'none'\n}, {\n  label: __('100 Milliseconds'),\n  value: 'delay-100ms'\n}, {\n  label: __('200 Milliseconds'),\n  value: 'delay-200ms'\n}, {\n  label: __('500 Milliseconds'),\n  value: 'delay-500ms'\n}, {\n  label: __('One Second'),\n  value: 'delay-1s'\n}, {\n  label: __('Two Second'),\n  value: 'delay-2s'\n}, {\n  label: __('Three Second'),\n  value: 'delay-3s'\n}, {\n  label: __('Four Second'),\n  value: 'delay-4s'\n}, {\n  label: __('Five Second'),\n  value: 'delay-5s'\n}];\nvar speedList = [{\n  label: __('Default'),\n  value: 'none'\n}, {\n  label: __('Slow'),\n  value: 'slow'\n}, {\n  label: __('Slower'),\n  value: 'slower'\n}, {\n  label: __('Fast'),\n  value: 'fast'\n}, {\n  label: __('Faster'),\n  value: 'faster'\n}];\n\n//# sourceURL=webpack:///./src/data.js?");

/***/ }),

/***/ "./src/editor.js":
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data.js */ \"./src/data.js\");\nfunction _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }\n\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _iterableToArrayLimit(arr, i) { if (typeof Symbol === \"undefined\" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i[\"return\"] != null) _i[\"return\"](); } finally { if (_d) throw _e; } } return _arr; }\n\nfunction _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }\n\n/**\r\n * WordPress dependencies.\r\n */\nvar __ = wp.i18n.__;\nvar _wp$components = wp.components,\n    Button = _wp$components.Button,\n    Popover = _wp$components.Popover;\nvar _wp$components2 = wp.components,\n    SelectControl = _wp$components2.SelectControl,\n    TextControl = _wp$components2.TextControl;\nvar _wp$element = wp.element,\n    useState = _wp$element.useState,\n    useEffect = _wp$element.useEffect,\n    Fragment = _wp$element.Fragment;\n/**\r\n * Internal dependencies.\r\n */\n\n\n\nfunction AnimationControls(_ref) {\n  var clientId = _ref.clientId,\n      setAttributes = _ref.setAttributes,\n      attributes = _ref.attributes;\n\n  var _useState = useState('none'),\n      _useState2 = _slicedToArray(_useState, 2),\n      animation = _useState2[0],\n      setAnimation = _useState2[1];\n\n  var _useState3 = useState('default'),\n      _useState4 = _slicedToArray(_useState3, 2),\n      delay = _useState4[0],\n      setDelay = _useState4[1];\n\n  var _useState5 = useState('default'),\n      _useState6 = _slicedToArray(_useState5, 2),\n      speed = _useState6[0],\n      setSpeed = _useState6[1];\n\n  var _useState7 = useState(false),\n      _useState8 = _slicedToArray(_useState7, 2),\n      isVisible = _useState8[0],\n      setIsVisible = _useState8[1];\n\n  var _useState9 = useState(''),\n      _useState10 = _slicedToArray(_useState9, 2),\n      currentInput = _useState10[0],\n      setCurrentInput = _useState10[1];\n\n  var categories = [{\n    label: 'Bouncing',\n    value: 'bounce'\n  }, {\n    label: 'Fading',\n    value: 'fade'\n  }, {\n    label: 'Flipping',\n    value: 'flip'\n  }, {\n    label: 'Rotating',\n    value: 'rotate'\n  }, {\n    label: 'Sliding',\n    value: 'slide'\n  }, {\n    label: 'Zooming',\n    value: 'zoom'\n  }, {\n    label: 'Rolling',\n    value: 'roll'\n  }, {\n    label: 'Other',\n    value: 'light'\n  }];\n  useEffect(function () {\n    var classes;\n\n    if (attributes.className) {\n      classes = attributes.className;\n      classes = classes.split(' ');\n      var animationClass = Array.from(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"animationsList\"]).find(function (i) {\n        return classes.find(function (o) {\n          return o === i.value;\n        });\n      });\n      var delayClass = Array.from(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"delayList\"]).find(function (i) {\n        return classes.find(function (o) {\n          return o === i.value;\n        });\n      });\n      var speedClass = Array.from(_data_js__WEBPACK_IMPORTED_MODULE_0__[\"speedList\"]).find(function (i) {\n        return classes.find(function (o) {\n          return o === i.value;\n        });\n      });\n      setAnimation(animationClass ? animationClass.value : 'none');\n      setDelay(delayClass ? delayClass.value : 'default');\n      setSpeed(speedClass ? speedClass.value : 'default');\n    }\n  });\n\n  var updateAnimation = function updateAnimation(e) {\n    var classes;\n    var animationValue = 'none' !== e ? e : '';\n\n    if (attributes.className) {\n      classes = attributes.className;\n      classes = classes.split(' ');\n      var exists = classes.find(function (i) {\n        return i === animation;\n      });\n      var animatedExists = classes.find(function (i) {\n        return 'animated' === i;\n      });\n\n      if (!animatedExists) {\n        classes.push('animated');\n      }\n\n      if (exists) {\n        classes = classes.join(' ').replace(animation, animationValue);\n      } else {\n        classes.push(animationValue);\n        classes = classes.join(' ');\n      }\n    } else {\n      classes = \"animated \".concat(animationValue);\n    }\n\n    if ('none' === e) {\n      classes = classes.replace('animated', '').replace(delay, '').replace(speed, '');\n      setDelay('default');\n      setSpeed('default');\n    }\n\n    classes = classes.replace(/\\s+/g, ' ');\n    setAnimation(e);\n    setAttributes({\n      className: classes\n    });\n    var block = document.querySelector(\"#block-\".concat(clientId, \" .animated\"));\n\n    if (block) {\n      _data_js__WEBPACK_IMPORTED_MODULE_0__[\"outAnimation\"].forEach(function (i) {\n        var isOut = block.className.includes(i);\n\n        if (isOut) {\n          block.addEventListener('animationend', function () {\n            block.classList.remove(i);\n            block.addEventListener('animationstart', function () {\n              block.classList.remove(i);\n            });\n          });\n        }\n      });\n    }\n  };\n\n  var updateDelay = function updateDelay(e) {\n    var classes;\n    var delayValue = 'none' !== e ? e : '';\n\n    if (attributes.className) {\n      classes = attributes.className;\n      classes = classes.split(' ');\n      var exists = classes.find(function (i) {\n        return i === delay;\n      });\n\n      if (exists) {\n        classes = classes.join(' ').replace(delay, delayValue);\n      } else {\n        classes.push(delayValue);\n        classes = classes.join(' ');\n      }\n    } else {\n      classes = delayValue;\n    }\n\n    classes = classes.replace(/\\s+/g, ' ');\n    setDelay(e);\n    setAttributes({\n      className: classes\n    });\n  };\n\n  var updateSpeed = function updateSpeed(e) {\n    var classes;\n    var speedValue = 'none' !== e ? e : '';\n\n    if (attributes.className) {\n      classes = attributes.className;\n      classes = classes.split(' ');\n      var exists = classes.find(function (i) {\n        return i === speed;\n      });\n\n      if (exists) {\n        classes = classes.join(' ').replace(speed, speedValue);\n      } else {\n        classes.push(speedValue);\n        classes = classes.join(' ');\n      }\n    } else {\n      classes = speedValue;\n    }\n\n    classes = classes.replace(/\\s+/g, ' ');\n    setSpeed(e);\n    setAttributes({\n      className: classes\n    });\n  };\n\n  var toggleVisible = function toggleVisible() {\n    setIsVisible(!isVisible);\n  };\n\n  var getAnimations = function getAnimations() {\n    var ret = [];\n\n    if (currentInput) {\n      _data_js__WEBPACK_IMPORTED_MODULE_0__[\"animationsList\"].map(function (animation) {\n        //if ( animation.label.toLowerCase().includes( currentInput.toLowerCase() ) ) {\n        var found = true;\n        var inputWords = currentInput.toLowerCase().split(' ');\n        inputWords.forEach(function (word) {\n          if (!animation.label.toLowerCase().includes(word)) {\n            found = false;\n          }\n        });\n\n        if (found) {\n          ret.push(wp.element.createElement(\"div\", null, wp.element.createElement(Button, {\n            onClick: function onClick() {\n              return updateAnimation(animation.value);\n            }\n          }, animation.label)));\n        }\n      });\n    }\n\n    if (!currentInput) {\n      var categoryIndex = 0;\n      _data_js__WEBPACK_IMPORTED_MODULE_0__[\"animationsList\"].map(function (animation) {\n        if (categoryIndex < categories.length && animation.value.includes(categories[categoryIndex].value)) {\n          categoryIndex++;\n          ret.push(wp.element.createElement(Fragment, null, wp.element.createElement(\"div\", {\n            className: \"category\"\n          }, categories[categoryIndex - 1].label), wp.element.createElement(\"div\", null, wp.element.createElement(Button, {\n            onClick: function onClick() {\n              return updateAnimation(animation.value);\n            }\n          }, animation.label))));\n        } else {\n          ret.push(wp.element.createElement(\"div\", null, wp.element.createElement(Button, {\n            onClick: function onClick() {\n              return updateAnimation(animation.value);\n            }\n          }, animation.label)));\n        }\n      });\n    }\n\n    return ret;\n  };\n\n  return wp.element.createElement(Fragment, null, wp.element.createElement(\"p\", null, \"Animation\"), wp.element.createElement(Button, {\n    isSecondary: true,\n    className: \"animationButton\",\n    onClick: toggleVisible\n  }, animation || 'none', isVisible && wp.element.createElement(\"div\", {\n    className: \"container\"\n  }, wp.element.createElement(Popover, {\n    className: \"animationPopover\"\n  }, wp.element.createElement(TextControl, {\n    className: \"textControl\",\n    onChange: function onChange(currentInput) {\n      setCurrentInput(currentInput);\n    }\n  }), wp.element.createElement(\"div\", null, getAnimations().map(function (animation) {\n    return wp.element.createElement(\"div\", null, animation);\n  }))))), 'none' !== animation && wp.element.createElement(Fragment, null, wp.element.createElement(SelectControl, {\n    label: __('Delay'),\n    value: delay || 'default',\n    options: _data_js__WEBPACK_IMPORTED_MODULE_0__[\"delayList\"],\n    onChange: updateDelay\n  }), wp.element.createElement(SelectControl, {\n    label: __('Speed'),\n    value: speed || 'default',\n    options: _data_js__WEBPACK_IMPORTED_MODULE_0__[\"speedList\"],\n    onChange: updateSpeed\n  })));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (AnimationControls);\n\n//# sourceURL=webpack:///./src/editor.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _editor_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./editor.js */ \"./src/editor.js\");\n/**\r\n * WordPress dependencies.\r\n */\nvar __ = wp.i18n.__;\nvar hasBlockSupport = wp.blocks.hasBlockSupport;\nvar PanelBody = wp.components.PanelBody;\nvar createHigherOrderComponent = wp.compose.createHigherOrderComponent;\n\nvar _ref = wp.blockEditor || wp.editor,\n    InspectorControls = _ref.InspectorControls;\n\nvar Fragment = wp.element.Fragment;\nvar addFilter = wp.hooks.addFilter;\n/**\r\n * Internal dependencies.\r\n */\n\n\nvar withInspectorControls = createHigherOrderComponent(function (BlockEdit) {\n  return function (props) {\n    var hasCustomClassName = hasBlockSupport(props.name, 'customClassName', true);\n\n    if (hasCustomClassName && props.isSelected) {\n      return wp.element.createElement(Fragment, null, wp.element.createElement(BlockEdit, props), wp.element.createElement(InspectorControls, null, wp.element.createElement(PanelBody, {\n        title: __('Animations'),\n        initialOpen: false\n      }, wp.element.createElement(_editor_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"], {\n        clientId: props.clientId,\n        setAttributes: props.setAttributes,\n        attributes: props.attributes\n      }))));\n    }\n\n    return wp.element.createElement(BlockEdit, props);\n  };\n}, 'withInspectorControl');\naddFilter('editor.BlockEdit', 'themeisle-custom-css/with-inspector-controls', withInspectorControls);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });