"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/flru";
exports.ids = ["vendor-chunks/flru"];
exports.modules = {

/***/ "(ssr)/./node_modules/flru/dist/flru.mjs":
/*!*****************************************!*\
  !*** ./node_modules/flru/dist/flru.mjs ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(max) {\n\tvar num, curr, prev;\n\tvar limit = max || 1;\n\n\tfunction keep(key, value) {\n\t\tif (++num > limit) {\n\t\t\tprev = curr;\n\t\t\treset(1);\n\t\t\t++num;\n\t\t}\n\t\tcurr[key] = value;\n\t}\n\n\tfunction reset(isPartial) {\n\t\tnum = 0;\n\t\tcurr = Object.create(null);\n\t\tisPartial || (prev=Object.create(null));\n\t}\n\n\treset();\n\n\treturn {\n\t\tclear: reset,\n\t\thas: function (key) {\n\t\t\treturn curr[key] !== void 0 || prev[key] !== void 0;\n\t\t},\n\t\tget: function (key) {\n\t\t\tvar val = curr[key];\n\t\t\tif (val !== void 0) return val;\n\t\t\tif ((val=prev[key]) !== void 0) {\n\t\t\t\tkeep(key, val);\n\t\t\t\treturn val;\n\t\t\t}\n\t\t},\n\t\tset: function (key, value) {\n\t\t\tif (curr[key] !== void 0) {\n\t\t\t\tcurr[key] = value;\n\t\t\t} else {\n\t\t\t\tkeep(key, value);\n\t\t\t}\n\t\t}\n\t};\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZmxydS9kaXN0L2ZscnUubWpzIiwibWFwcGluZ3MiOiI7Ozs7QUFBQSw2QkFBZSxvQ0FBVTtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiRDpcXG15cHJvZ3JhbVxcbWlhZG1pblxcbm9kZV9tb2R1bGVzXFxmbHJ1XFxkaXN0XFxmbHJ1Lm1qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobWF4KSB7XG5cdHZhciBudW0sIGN1cnIsIHByZXY7XG5cdHZhciBsaW1pdCA9IG1heCB8fCAxO1xuXG5cdGZ1bmN0aW9uIGtlZXAoa2V5LCB2YWx1ZSkge1xuXHRcdGlmICgrK251bSA+IGxpbWl0KSB7XG5cdFx0XHRwcmV2ID0gY3Vycjtcblx0XHRcdHJlc2V0KDEpO1xuXHRcdFx0KytudW07XG5cdFx0fVxuXHRcdGN1cnJba2V5XSA9IHZhbHVlO1xuXHR9XG5cblx0ZnVuY3Rpb24gcmVzZXQoaXNQYXJ0aWFsKSB7XG5cdFx0bnVtID0gMDtcblx0XHRjdXJyID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcblx0XHRpc1BhcnRpYWwgfHwgKHByZXY9T2JqZWN0LmNyZWF0ZShudWxsKSk7XG5cdH1cblxuXHRyZXNldCgpO1xuXG5cdHJldHVybiB7XG5cdFx0Y2xlYXI6IHJlc2V0LFxuXHRcdGhhczogZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cmV0dXJuIGN1cnJba2V5XSAhPT0gdm9pZCAwIHx8IHByZXZba2V5XSAhPT0gdm9pZCAwO1xuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHR2YXIgdmFsID0gY3VycltrZXldO1xuXHRcdFx0aWYgKHZhbCAhPT0gdm9pZCAwKSByZXR1cm4gdmFsO1xuXHRcdFx0aWYgKCh2YWw9cHJldltrZXldKSAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdGtlZXAoa2V5LCB2YWwpO1xuXHRcdFx0XHRyZXR1cm4gdmFsO1xuXHRcdFx0fVxuXHRcdH0sXG5cdFx0c2V0OiBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuXHRcdFx0aWYgKGN1cnJba2V5XSAhPT0gdm9pZCAwKSB7XG5cdFx0XHRcdGN1cnJba2V5XSA9IHZhbHVlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0a2VlcChrZXksIHZhbHVlKTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59XG4iXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbMF0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/flru/dist/flru.mjs\n");

/***/ })

};
;