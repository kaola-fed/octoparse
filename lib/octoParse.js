"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.htmlParse = htmlParse;
exports.install = install;

var _html2json = require("./parse/html2json");

/**
 * utils函数引入
 **/
// function agentFunc(){
// };

/**
 * 主函数入口区
 **/
function htmlParse() {
  var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '<div></div>';
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var transData = {}; //存放转化后的数据

  var res = {}; //返回的数据

  transData = (0, _html2json.html2json)(data, 'root', options); // console.log('解析结果是', transData);

  res = transData;
  return res;
}
/**
 * plugin挂载方法
 **/


function install(Vue) {
  Vue.prototype.$htmlParse = htmlParse;
  Vue.prototype.$agentFunc = agentFunc;
}