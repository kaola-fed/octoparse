
/**
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/maxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/maxParse-alpha0-1-html-markdown/184
 */

/**
 * utils函数引入
 **/
import HtmlToJson from './utils/html2json';
/**
 * 配置及公有属性
 **/
// var realWindowWidth = 0;
// var realWindowHeight = 0;
// wx.getSystemInfo({
//   success: function (res) {
//     realWindowWidth = res.windowWidth
//     realWindowHeight = res.windowHeight
//   }
// })

/**
 * 主函数入口区
 **/
function maxParse({type='html', data='<div class="color:red;">数据不能为空</div>'}){
  var transData = {};//存放转化后的数据
  let res = {};  //返回的数据
  if (type == 'html') {
    transData = HtmlToJson.html2json(data, 'root');
  }
  res = transData;
  return res;
}
// module.exports = {
//   maxParse: maxParse
// }
export default maxParse;

