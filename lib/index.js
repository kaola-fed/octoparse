"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _octoParse = require("./octoParse");

var _mountAction = _interopRequireDefault(require("./mountAction"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var octoparse = {
  htmlParse: _octoParse.htmlParse,
  install: _octoParse.install,
  mountAction: _mountAction["default"]
};
module.exports = octoparse;
var _default = octoparse;
exports["default"] = _default;