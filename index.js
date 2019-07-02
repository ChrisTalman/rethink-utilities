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

/***/ "./src/Modules/EmptyDictionaryFromArray.ts":
/*!*************************************************!*\
  !*** ./src/Modules/EmptyDictionaryFromArray.ts ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function (array, id) {\r\n    const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_0__[\"r\"]\r\n        .expr(array.map(item => item[id]))\r\n        .map(id => [id, true])\r\n        .coerceTo('object');\r\n    return query;\r\n});\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/EmptyDictionaryFromArray.ts?");

/***/ }),

/***/ "./src/Modules/ExtendInsertOptions.ts":
/*!********************************************!*\
  !*** ./src/Modules/ExtendInsertOptions.ts ***!
  \********************************************/
/*! exports provided: default, RethinkExtendInsertOptionsError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return parse; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"RethinkExtendInsertOptionsError\", function() { return RethinkExtendInsertOptionsError; });\n\r\n;\r\n;\r\n;\r\nfunction parse(options) {\r\n    if ('conflict' in options && typeof options.conflict === 'object' && options.conflict !== null && 'withoutOld' in options.conflict) {\r\n        const helper = options.conflict;\r\n        options.conflict = (id, oldDocument, newDocument) => oldDocument.without(...helper.withoutOld).merge(newDocument);\r\n        return options;\r\n    }\r\n    else {\r\n        return options;\r\n    }\r\n    ;\r\n}\r\n;\r\nclass RethinkExtendInsertOptionsError extends Error {\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/ExtendInsertOptions.ts?");

/***/ }),

/***/ "./src/Modules/HasNestedField.ts":
/*!***************************************!*\
  !*** ./src/Modules/HasNestedField.ts ***!
  \***************************************/
/*! exports provided: hasNestedField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"hasNestedField\", function() { return hasNestedField; });\n\r\nfunction hasNestedField({ nest, path }) {\r\n    if (path.length === 0)\r\n        return false;\r\n    const pathField = path[0];\r\n    let has = false;\r\n    if (Array.isArray(nest)) {\r\n        for (let field of nest) {\r\n            if (typeof field === 'object') {\r\n                has = hasNestedField({ nest: field, path });\r\n            }\r\n            else {\r\n                has = field === pathField;\r\n            }\r\n            ;\r\n            if (has) {\r\n                break;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n    }\r\n    else if (typeof nest === 'object') {\r\n        for (let { 0: key, 1: value } of Object.entries(nest)) {\r\n            if (typeof value === 'object') {\r\n                const nestedPath = path.slice(1);\r\n                has = key === pathField && (path.length === 1 || hasNestedField({ nest: value, path: nestedPath }));\r\n            }\r\n            else if (typeof value === 'string') {\r\n                has = value === pathField;\r\n            }\r\n            else {\r\n                has = key === pathField;\r\n            }\r\n            ;\r\n            if (has) {\r\n                break;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n    }\r\n    else {\r\n        has = nest === pathField;\r\n    }\r\n    ;\r\n    return has;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/HasNestedField.ts?");

/***/ }),

/***/ "./src/Modules/Pluck.ts":
/*!******************************!*\
  !*** ./src/Modules/Pluck.ts ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\r\n;\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({ rows, pluck }) {\r\n    const rowsList = Array.isArray(rows) ? rows : [rows];\r\n    const pluckedRows = [];\r\n    for (let row of rowsList) {\r\n        const pluckedRow = {};\r\n        pluckFields(pluck, row, pluckedRow);\r\n        pluckedRows.push(pluckedRow);\r\n    }\r\n    ;\r\n    const output = Array.isArray(rows) ? pluckedRows : pluckedRows[0];\r\n    return output;\r\n});\r\n;\r\nfunction pluckFields(pluck, document, pluckedDocument) {\r\n    const pluckList = Array.isArray(pluck) ? pluck : Object.keys(pluck).map(key => ({ [key]: pluck[key] }));\r\n    for (let field of pluckList) {\r\n        if (typeof field === 'string' && document.hasOwnProperty(field)) {\r\n            pluckedDocument[field] = document[field];\r\n        }\r\n        else if (typeof field === 'object') {\r\n            const subFieldKeys = Object.keys(field);\r\n            for (let subFieldKey of subFieldKeys) {\r\n                if (!document.hasOwnProperty(subFieldKey)) {\r\n                    continue;\r\n                }\r\n                ;\r\n                const subDocument = document[subFieldKey];\r\n                const pluckedSubdocument = {};\r\n                const subField = field[subFieldKey];\r\n                if (typeof subField === 'boolean') {\r\n                    pluckedSubdocument[subFieldKey] = document[subFieldKey];\r\n                }\r\n                else {\r\n                    pluckFields(subField, subDocument, pluckedSubdocument);\r\n                }\r\n                ;\r\n                const somePlucked = Object.keys(pluckedSubdocument).length > 0;\r\n                if (somePlucked) {\r\n                    pluckedDocument[subFieldKey] = pluckedSubdocument;\r\n                }\r\n                ;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Pluck.ts?");

/***/ }),

/***/ "./src/Modules/Run.ts":
/*!****************************!*\
  !*** ./src/Modules/Run.ts ***!
  \****************************/
/*! exports provided: default, ReqlRuntimeWriteError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ReqlRuntimeWriteError\", function() { return ReqlRuntimeWriteError; });\n/* harmony import */ var src_Modules_Utilities_Delay__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/Modules/Utilities/Delay */ \"./src/Modules/Utilities/Delay.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n;\r\n;\r\nconst DELAY_DURATIONS = [200, 600, 1800, 3000];\r\nconst MAX_ATTEMPTS = DELAY_DURATIONS.length;\r\nconst TRANSIENT_ERROR_NAMES = [\r\n    'ReqlTimeoutError',\r\n    'ReqlOpFailedError',\r\n    'ReqlOpIndeterminateError'\r\n];\r\n/* harmony default export */ __webpack_exports__[\"default\"] = (function ({ query, options }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        let result;\r\n        let success = false;\r\n        let lastError;\r\n        for (let attemptIndex = 0; attemptIndex < MAX_ATTEMPTS; attemptIndex++) {\r\n            try {\r\n                result = yield attempt({ query, options });\r\n            }\r\n            catch (error) {\r\n                const isTransientError = typeof error === 'object' && error !== null && TRANSIENT_ERROR_NAMES.includes(error.name);\r\n                if (!isTransientError)\r\n                    throw error;\r\n                lastError = error;\r\n                const delayDuration = DELAY_DURATIONS[attemptIndex];\r\n                yield Object(src_Modules_Utilities_Delay__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(delayDuration);\r\n                continue;\r\n            }\r\n            ;\r\n            success = true;\r\n            break;\r\n        }\r\n        ;\r\n        if (!success)\r\n            throw lastError;\r\n        if (options.throwRuntime)\r\n            throwReqlRuntimeWriteError(result);\r\n        return result;\r\n    });\r\n});\r\n;\r\nfunction attempt({ query, options }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const parameters = [];\r\n        if (options.connection)\r\n            parameters.push(options.connection);\r\n        if (options.runOptions)\r\n            parameters.push(options.runOptions);\r\n        const result = yield query.run(...parameters);\r\n        return result;\r\n    });\r\n}\r\n;\r\nfunction throwReqlRuntimeWriteError(result) {\r\n    if (Array.isArray(result)) {\r\n        for (let item of result) {\r\n            throwReqlRuntimeWriteError(item);\r\n        }\r\n        ;\r\n    }\r\n    else if (typeof result === 'object' && result !== null) {\r\n        if (typeof result.errors === 'number' && result.errors > 0 && typeof result.first_error === 'string')\r\n            throw new ReqlRuntimeWriteError(result);\r\n        const keys = Object.keys(result);\r\n        for (let key of keys) {\r\n            const value = result[key];\r\n            throwReqlRuntimeWriteError(value);\r\n        }\r\n        ;\r\n    }\r\n    ;\r\n}\r\n;\r\nclass ReqlRuntimeWriteError extends Error {\r\n    constructor(result) {\r\n        super(result.first_error);\r\n        this.result = result;\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Run.ts?");

/***/ }),

/***/ "./src/Modules/Utilities/Delay.ts":
/*!****************************************!*\
  !*** ./src/Modules/Utilities/Delay.ts ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return delay; });\n\r\nfunction delay(milliseconds) {\r\n    const promise = new Promise(resolve => setTimeout(resolve, milliseconds));\r\n    return promise;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Utilities/Delay.ts?");

/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! exports provided: run, ReqlRuntimeWriteError, pluck, hasNestedField, emptyDictionaryFromArray, extendInsertOptions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_Modules_Run__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/Modules/Run */ \"./src/Modules/Run.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"run\", function() { return src_Modules_Run__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ReqlRuntimeWriteError\", function() { return src_Modules_Run__WEBPACK_IMPORTED_MODULE_0__[\"ReqlRuntimeWriteError\"]; });\n\n/* harmony import */ var src_Modules_Pluck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/Modules/Pluck */ \"./src/Modules/Pluck.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pluck\", function() { return src_Modules_Pluck__WEBPACK_IMPORTED_MODULE_1__[\"default\"]; });\n\n/* harmony import */ var src_Modules_HasNestedField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/Modules/HasNestedField */ \"./src/Modules/HasNestedField.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hasNestedField\", function() { return src_Modules_HasNestedField__WEBPACK_IMPORTED_MODULE_2__[\"hasNestedField\"]; });\n\n/* harmony import */ var src_Modules_EmptyDictionaryFromArray__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/Modules/EmptyDictionaryFromArray */ \"./src/Modules/EmptyDictionaryFromArray.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"emptyDictionaryFromArray\", function() { return src_Modules_EmptyDictionaryFromArray__WEBPACK_IMPORTED_MODULE_3__[\"default\"]; });\n\n/* harmony import */ var src_Modules_ExtendInsertOptions__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/Modules/ExtendInsertOptions */ \"./src/Modules/ExtendInsertOptions.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"extendInsertOptions\", function() { return src_Modules_ExtendInsertOptions__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "rethinkdb-ts":
/*!*******************************!*\
  !*** external "rethinkdb-ts" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"rethinkdb-ts\");\n\n//# sourceURL=webpack:///external_%22rethinkdb-ts%22?");

/***/ })

/******/ });
});