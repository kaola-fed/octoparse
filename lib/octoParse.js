
/**
 * utils函数引入
 **/
import HtmlToJson from './utils/html2json';

/**
 * 主函数入口区
 **/
function htmlParse({type='html', data='<div class="color:red;">数据不能为空</div>'}){
  var transData = {};//存放转化后的数据
  let res = {};  //返回的数据
  if (type == 'html') {
    transData = HtmlToJson.html2json(data, 'root');
  }
  res = transData;
  return res;
}
/**
 * plugin挂载方法
 **/
function install(Vue){
  Vue.$htmlParse = htmlParse;
}
export {
  htmlParse,
  install
}
