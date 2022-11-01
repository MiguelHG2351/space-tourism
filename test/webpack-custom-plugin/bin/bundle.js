/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("\n  /**\n   * Loader API Version: 2\n   * Is this in \"webpack mode\": true\n   */\n  /**\n   * Original Source From Loader\n   */\n  function loadEventListerner(e) {\n  console.log('loadEventListerner', e);\n  const proxy = new Proxy({}, {\n    get: function (target, key, receiver) {\n      console.log(`getting ${key}!`);\n      return Reflect.get(target, key, receiver);\n    }\n  });\n  console.log('proxy', proxy);\n}\nwindow.addEventListener('load', event => {\n  loadEventListerner(event);\n});\n\n//# sourceURL=webpack://webpack-custom-plugin/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;