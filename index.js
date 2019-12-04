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

/***/ "./src/Modules/GetNestedField.ts":
/*!***************************************!*\
  !*** ./src/Modules/GetNestedField.ts ***!
  \***************************************/
/*! exports provided: getNestedField */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getNestedField\", function() { return getNestedField; });\n\r\nfunction getNestedField({ pluck, path }) {\r\n    if (path.length === 0) {\r\n        return undefined;\r\n    }\r\n    ;\r\n    const pathField = path[0];\r\n    let nest;\r\n    if (Array.isArray(pluck)) {\r\n        for (let field of pluck) {\r\n            if (typeof field === 'object' && !Array.isArray(field)) {\r\n                const fieldNest = field[pathField];\r\n                if (typeof fieldNest === 'object') {\r\n                    nest = fieldNest;\r\n                    break;\r\n                }\r\n                ;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n        if (!nest) {\r\n            return undefined;\r\n        }\r\n        ;\r\n    }\r\n    else if (typeof pluck === 'object') {\r\n        const pluckNest = pluck[pathField];\r\n        if (typeof pluckNest === 'object') {\r\n            nest = pluckNest;\r\n        }\r\n        else {\r\n            return undefined;\r\n        }\r\n        ;\r\n    }\r\n    else {\r\n        return undefined;\r\n    }\r\n    ;\r\n    if (path.length > 1) {\r\n        const nestPath = path.slice(1);\r\n        nest = getNestedField({ pluck: nest, path: nestPath });\r\n    }\r\n    ;\r\n    return nest;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/GetNestedField.ts?");

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

/***/ "./src/Modules/InsertUnique.ts":
/*!*************************************!*\
  !*** ./src/Modules/InsertUnique.ts ***!
  \*************************************/
/*! exports provided: InsertUnique, InsertUniqueConflictError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InsertUnique\", function() { return InsertUnique; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"InsertUniqueConflictError\", function() { return InsertUniqueConflictError; });\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! crypto */ \"crypto\");\n/* harmony import */ var crypto__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(crypto__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! moment */ \"moment\");\n/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rethinkdb-ts */ \"rethinkdb-ts\");\n/* harmony import */ var rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var src__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src */ \"./src/index.ts\");\n\r\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\r\n    return new (P || (P = Promise))(function (resolve, reject) {\r\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\r\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\r\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\r\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\r\n    });\r\n};\r\n\r\n\r\n\r\n\r\n;\r\n;\r\n;\r\n;\r\nconst DEFAULT_LIFETIME_MILLISECONDS = moment__WEBPACK_IMPORTED_MODULE_1___default.a.duration({ minutes: 5 }).asMilliseconds();\r\nconst UNIQUE_FIELD_NAME = 'unique';\r\nconst CONFLICT_FIELD_NAME = 'conflict';\r\nclass InsertUnique {\r\n    constructor({ table }) {\r\n        this.insert = insert;\r\n        this.table = table;\r\n    }\r\n    ;\r\n}\r\n;\r\nfunction insert({ conflict: conflictQuery, unique, insert: insertQuery }) {\r\n    return __awaiter(this, void 0, void 0, function* () {\r\n        const uniqueParameters = Object.assign({}, unique, { instance: this });\r\n        const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"]\r\n            .expr({ conflict: conflictQuery })\r\n            .merge((result) => ({\r\n            [UNIQUE_FIELD_NAME]: rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"]\r\n                .branch(result(CONFLICT_FIELD_NAME).eq(true), null, rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].expr({ result: generateUniqueQuery(uniqueParameters) }))\r\n        }))\r\n            .merge((result) => ({\r\n            [UNIQUE_FIELD_NAME]: rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].branch(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].or(result(UNIQUE_FIELD_NAME).eq(null), result(UNIQUE_FIELD_NAME)('result')('errors').gt(0)), null, result(UNIQUE_FIELD_NAME).merge({ document: result(UNIQUE_FIELD_NAME)('result')('changes').nth(0)('new_val') }))\r\n        }))\r\n            .merge((result) => ({\r\n            conflict: rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].branch(result(UNIQUE_FIELD_NAME).eq(null), result(CONFLICT_FIELD_NAME), result(UNIQUE_FIELD_NAME)('document')('count').ne(1))\r\n        }))\r\n            .merge((result) => ({\r\n            insert: rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].branch(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].or(result(UNIQUE_FIELD_NAME).eq(null), result(UNIQUE_FIELD_NAME)('result')('errors').gt(0), result(CONFLICT_FIELD_NAME).eq(true)), null, insertQuery)\r\n        }))\r\n            .merge((result) => ({\r\n            delete: rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].branch(result('insert').eq(null), null, rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"]\r\n                .table(this.table)\r\n                .get(result(UNIQUE_FIELD_NAME)('document')('id'))\r\n                .delete())\r\n        }));\r\n        const result = yield Object(src__WEBPACK_IMPORTED_MODULE_3__[\"run\"])({ query, options: { throwRuntime: true } });\r\n        if (result.conflict) {\r\n            throw new InsertUniqueConflictError({ result });\r\n        }\r\n        ;\r\n        return result;\r\n    });\r\n}\r\n;\r\nfunction generateUniqueQuery({ type, hash: hashObject, lifetime, instance }) {\r\n    const lifetimeMilliseconds = lifetime ? lifetime.asMilliseconds() : DEFAULT_LIFETIME_MILLISECONDS;\r\n    const hashObjectString = JSON.stringify(hashObject);\r\n    const hash = crypto__WEBPACK_IMPORTED_MODULE_0__[\"createHash\"]('sha1').update(hashObjectString).digest('base64');\r\n    const id = type + '-' + hash;\r\n    const query = rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"]\r\n        .table(instance.table, { readMode: 'majority' })\r\n        .get(id)\r\n        .replace((document) => document\r\n        .do(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].branch(rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].and(document.ne(null), rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].now().toEpochTime().mul(1000).gt(document('created').add(lifetimeMilliseconds))), null, document))\r\n        .do((document) => {\r\n        const newDocument = {\r\n            id,\r\n            type,\r\n            hash,\r\n            count: document.default({ count: 0 })('count').add(1),\r\n            created: document.default({ created: rethinkdb_ts__WEBPACK_IMPORTED_MODULE_2__[\"r\"].now().toEpochTime().mul(1000) })('created')\r\n        };\r\n        return newDocument;\r\n    }), {\r\n        returnChanges: true\r\n    });\r\n    return query;\r\n}\r\n;\r\nclass InsertUniqueConflictError extends Error {\r\n    constructor({ result }) {\r\n        const message = 'Insert Unique Error: Document could not be inserted because it already exists';\r\n        super(message);\r\n        this.result = result;\r\n    }\r\n    ;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/InsertUnique.ts?");

/***/ }),

/***/ "./src/Modules/Pluck.ts":
/*!******************************!*\
  !*** ./src/Modules/Pluck.ts ***!
  \******************************/
/*! exports provided: pluck */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"pluck\", function() { return pluck; });\n\r\n;\r\n;\r\n;\r\nfunction pluck({ rows: rowsRaw, pluck: pluckRaw }) {\r\n    const rows = Array.isArray(rowsRaw) ? rowsRaw : [rowsRaw];\r\n    let fields;\r\n    if (Array.isArray(pluckRaw)) {\r\n        fields = pluckRaw;\r\n    }\r\n    else if (typeof pluckRaw === 'string') {\r\n        fields = [pluckRaw];\r\n    }\r\n    else {\r\n        fields = Object.keys(pluckRaw).map(key => ({ [key]: pluckRaw[key] }));\r\n    }\r\n    ;\r\n    const results = [];\r\n    for (let row of rows) {\r\n        const result = {};\r\n        for (let field of fields) {\r\n            if (typeof field === 'string') {\r\n                if (field in row) {\r\n                    result[field] = row[field];\r\n                }\r\n                ;\r\n            }\r\n            else if (Array.isArray(field)) {\r\n                for (let subfield of field) {\r\n                    Object.assign(result, pluck({ rows: row, pluck: subfield }));\r\n                }\r\n                ;\r\n            }\r\n            else {\r\n                for (let { 0: subfield, 1: subsubfield } of Object.entries(field)) {\r\n                    const resolvedPluck = subsubfield === true ? [subfield] : subsubfield;\r\n                    result[subfield] = pluck({ rows: row[subfield], pluck: resolvedPluck });\r\n                }\r\n                ;\r\n            }\r\n            ;\r\n        }\r\n        ;\r\n        results.push(result);\r\n    }\r\n    ;\r\n    const output = Array.isArray(rowsRaw) ? results : results[0];\r\n    return output;\r\n}\r\n;\r\n\n\n//# sourceURL=webpack:///./src/Modules/Pluck.ts?");

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
/*! exports provided: run, ReqlRuntimeWriteError, pluck, hasNestedField, getNestedField, emptyDictionaryFromArray, extendInsertOptions, InsertUnique, InsertUniqueConflictError */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var src_Modules_Run__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/Modules/Run */ \"./src/Modules/Run.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"run\", function() { return src_Modules_Run__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"ReqlRuntimeWriteError\", function() { return src_Modules_Run__WEBPACK_IMPORTED_MODULE_0__[\"ReqlRuntimeWriteError\"]; });\n\n/* harmony import */ var src_Modules_Pluck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! src/Modules/Pluck */ \"./src/Modules/Pluck.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"pluck\", function() { return src_Modules_Pluck__WEBPACK_IMPORTED_MODULE_1__[\"pluck\"]; });\n\n/* harmony import */ var src_Modules_HasNestedField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! src/Modules/HasNestedField */ \"./src/Modules/HasNestedField.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"hasNestedField\", function() { return src_Modules_HasNestedField__WEBPACK_IMPORTED_MODULE_2__[\"hasNestedField\"]; });\n\n/* harmony import */ var src_Modules_GetNestedField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/Modules/GetNestedField */ \"./src/Modules/GetNestedField.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"getNestedField\", function() { return src_Modules_GetNestedField__WEBPACK_IMPORTED_MODULE_3__[\"getNestedField\"]; });\n\n/* harmony import */ var src_Modules_EmptyDictionaryFromArray__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! src/Modules/EmptyDictionaryFromArray */ \"./src/Modules/EmptyDictionaryFromArray.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"emptyDictionaryFromArray\", function() { return src_Modules_EmptyDictionaryFromArray__WEBPACK_IMPORTED_MODULE_4__[\"default\"]; });\n\n/* harmony import */ var src_Modules_ExtendInsertOptions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! src/Modules/ExtendInsertOptions */ \"./src/Modules/ExtendInsertOptions.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"extendInsertOptions\", function() { return src_Modules_ExtendInsertOptions__WEBPACK_IMPORTED_MODULE_5__[\"default\"]; });\n\n/* harmony import */ var _Modules_InsertUnique__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Modules/InsertUnique */ \"./src/Modules/InsertUnique.ts\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"InsertUnique\", function() { return _Modules_InsertUnique__WEBPACK_IMPORTED_MODULE_6__[\"InsertUnique\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"InsertUniqueConflictError\", function() { return _Modules_InsertUnique__WEBPACK_IMPORTED_MODULE_6__[\"InsertUniqueConflictError\"]; });\n\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/index.ts?");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"crypto\");\n\n//# sourceURL=webpack:///external_%22crypto%22?");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"moment\");\n\n//# sourceURL=webpack:///external_%22moment%22?");

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