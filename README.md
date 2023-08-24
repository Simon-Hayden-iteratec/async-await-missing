# AsyncAwaitMissing

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0.

## PoC

This project uses `async-await` to fetch some images. When building the project, I
expect the `async-await`s to still be in the final build.

However:

Run the following:

```sh
# Just to make sure, that no caches exist
rm -rf .angular node_modules/.cache
# Build without optimization to make code more readable
npm run build -- --optimization=false --output-hashing=none
```

And you will see the following at the bottom of `dist/async-await-missing/main.js`:

```js
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _asyncToGenerator)
/* harmony export */ });
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function () {
    var self = this,
      args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(undefined);
    });
  };
}
```

Even though no legacy browsers are targeted, all async-awaits have been replaced
with calls to this helper function.
