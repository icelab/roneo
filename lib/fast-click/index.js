'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = fastClick;

var _fastclick = require('fastclick');

var _fastclick2 = _interopRequireDefault(_fastclick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function fastClick(el) {
  _fastclick2.default.attach(el);
}