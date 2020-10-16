
/**
 * utils函数引入
 **/
import {html2json} from './parse/html2json';

/**
 * 主函数入口区
 **/
function htmlParse(data='<div></div>', options={}){
  var transData = {};//存放转化后的数据
  let res = {};  //返回的数据
  transData = html2json(data, 'root', options);
  // console.log('解析结果是', transData);
  res = transData;
  return res;
}
/**
 * plugin挂载方法
 **/
function install(Vue){
  Vue.prototype.$htmlParse = htmlParse;
}
export {
  htmlParse,
  install
}
