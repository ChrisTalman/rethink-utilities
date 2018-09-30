(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ExtendInsertOptions.ts":
/*!************************************!*\
  !*** ./src/ExtendInsertOptions.ts ***!
  \************************************/
/*! exports provided: default, RethinkExtendInsertOptionsError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return parse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RethinkExtendInsertOptionsError\", function() { return RethinkExtendInsertOptionsError; });\n/* harmony import */ var _Instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Instance */ \"./src/Instance.ts\");\n\r\n\r\n;\r\n;\r\n;\r\nfunction parse(options) {\r\n    const instance = this;\r\n    if (!(instance instanceof _Instance__WEBPACK_IMPORTED_MODULE_0__[\"default\"])) {\r\n        throw new RethinkExtendInsertOptionsError('\\'this\\' must be Instance class.');\r\n    }\r\n    ;\r\n    if ('conflict' in options && typeof options.conflict === 'object' && options.conflict !== null && 'withoutOld' in options.conflict) {\r\n        const helper = options.conflict;\r\n        options.conflict = (id, oldDocument, newDocument) => oldDocument.without(instance.RethinkDB.args(helper.withoutOld)).merge(newDocument);\r\n        return options;\r\n    }\r\n    else {\r\n        return options;\r\n    }\r\n    ;\r\n}\r\n;\r\nclass RethinkExtendInsertOptionsError extends Error {\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/ExtendInsertOptions.ts?");

/***/ }),

/***/ "./src/Instance.ts":
/*!*************************!*\
  !*** ./src/Instance.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Run__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Run */ \"./src/Run.ts\");\n/* harmony import */ var _ExtendInsertOptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ExtendInsertOptions */ \"./src/ExtendInsertOptions.ts\");\n\r\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (class {\r\n    constructor({ RethinkDB }) {\r\n        this.run = _Run__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\r\n        this.parseExtendedInsertOptions = _ExtendInsertOptions__WEBPACK_IMPORTED_MODULE_1__[\"default\"];\r\n        this.RethinkDB = RethinkDB;\r\n    }\r\n    ;\r\n});\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Instance.ts?");

/***/ }),

/***/ "./src/Run.ts":
/*!********************!*\
  !*** ./src/Run.ts ***!
  \********************/
/*! exports provided: default, RethinkRunError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RethinkRunError\", function() { return RethinkRunError; });\n/* harmony import */ var _bluecewe_empty_promise__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @bluecewe/empty-promise */ \"@bluecewe/empty-promise\");\n/* harmony import */ var _bluecewe_empty_promise__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_bluecewe_empty_promise__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _ThrowResultError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThrowResultError */ \"./src/ThrowResultError.ts\");\n/* harmony import */ var _Instance__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Instance */ \"./src/Instance.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n;\r\nconst MAX_ATTEMPTS = 3;\r\nconst DELAY_MILLISECONDS = 200;\r\nconst WRITE_COMMANDS = [\r\n    'insert',\r\n    'update',\r\n    'replace',\r\n    'delete'\r\n];\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({ query, options }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        if (typeof query !== 'function') {\r\n            throw new RethinkRunError('\\'query\\' parameter must be function.');\r\n        }\r\n        ;\r\n        const instance = this;\r\n        if (!(instance instanceof _Instance__WEBPACK_IMPORTED_MODULE_2__[\"default\"])) {\r\n            throw new RethinkRunError('\\'this\\' must be Instance class.');\r\n        }\r\n        ;\r\n        options = parseOptions(options);\r\n        validateQuery({ query, instance });\r\n        for (let attemptNumber = 0; attemptNumber < (MAX_ATTEMPTS + 1); attemptNumber++) {\r\n            let output;\r\n            try {\r\n                output = yield attempt({ query, options });\r\n            }\r\n            catch (error) {\r\n                const moreAttempts = attemptNumber < MAX_ATTEMPTS;\r\n                if (moreAttempts) {\r\n                    yield delay(attemptNumber);\r\n                    continue;\r\n                }\r\n                else {\r\n                    throw error;\r\n                }\r\n                ;\r\n            }\r\n            ;\r\n            handleResultError(output, options, query);\r\n            return output;\r\n        }\r\n        ;\r\n    });\r\n});\r\n;\r\nfunction attempt({ query, options }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const output = yield query.run(options.rethink);\r\n        return output;\r\n    });\r\n}\r\n;\r\nfunction delay(attemptNumber) {\r\n    const promise = _bluecewe_empty_promise__WEBPACK_IMPORTED_MODULE_0___default.a.generate();\r\n    const delay = DELAY_MILLISECONDS + ((DELAY_MILLISECONDS * 2) * attemptNumber);\r\n    setTimeout(promise.resolve, delay);\r\n    return promise;\r\n}\r\n;\r\nfunction validateQuery({ query, instance }) {\r\n    return;\r\n    const RethinkDbTerm = Object.getPrototypeOf(instance.RethinkDB.table('none')).constructor;\r\n    if (typeof query === 'function') {\r\n        console.log('Constant:', RethinkDbTerm);\r\n        console.log('Type:', Object.getPrototypeOf(query).constructor);\r\n        const isTerm = Object.getPrototypeOf(query).constructor === RethinkDbTerm;\r\n        if (isTerm) {\r\n            throw new RethinkRunError('Query not of RethinkDB Term type.');\r\n        }\r\n        ;\r\n    }\r\n    else if (typeof query === 'object' && query !== null && !(query instanceof Promise)) {\r\n        console.log('Constructor:', query.constructor);\r\n        console.log('Prototype:', Object.getPrototypeOf(query));\r\n    }\r\n    else {\r\n        throw new RethinkRunError('Query must be function or response object.');\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction parseOptions(options = {}) {\r\n    if (!options.hasOwnProperty('throwResultError')) {\r\n        options.throwResultError = true;\r\n    }\r\n    ;\r\n    return options;\r\n}\r\n;\r\nfunction handleResultError(output, options, query) {\r\n    const isWriteQuery = WRITE_COMMANDS.includes(Object.getPrototypeOf(query).mt);\r\n    if (!options.throwResultError || !isWriteQuery) {\r\n        return;\r\n    }\r\n    ;\r\n    Object(_ThrowResultError__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(output);\r\n}\r\n;\r\nclass RethinkRunError extends Error {\r\n    constructor(message) {\r\n        super(message);\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Run.ts?");

/***/ }),

/***/ "./src/ThrowResultError.ts":
/*!*********************************!*\
  !*** ./src/ThrowResultError.ts ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return throwResultError; });\n\r\nfunction throwResultError(result) {\r\n    if (result.errors > 0) {\r\n        throw new Error(result.first_error);\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/ThrowResultError.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: default, throwResultError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Instance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Instance */ \"./src/Instance.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return _Instance__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony import */ var _ThrowResultError__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ThrowResultError */ \"./src/ThrowResultError.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"throwResultError\", function() { return _ThrowResultError__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "@bluecewe/empty-promise":
/*!******************************************!*\
  !*** external "@bluecewe/empty-promise" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@bluecewe/empty-promise\");\n\n//# sourceURL=webpack:///external_%22@bluecewe/empty-promise%22?");

/***/ })

/******/ });
});