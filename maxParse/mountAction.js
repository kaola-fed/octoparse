

// 图片点击事件
function wxParseImgTap(e) {
    console.log('触发了点击事件')
    var that = this;
    var nowImgUrl = e.target.dataset.src;
    var tagFrom = e.target.dataset.from;
    if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
      wx.previewImage({
        current: nowImgUrl, // 当前显示图片的http链接
        // urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
        urls: [nowImgUrl]
      })
    }
}
/// a 跳转事件
function wxParseTagATap(e){
    var href = e.currentTarget.dataset.src;
    console.log(href);
}
function mountDefaultAction(wx){
    wx.wxParseImgTap = wxParseImgTap;
    wx.wxParseTagATap = wxParseTagATap;
}
function mountAction(wx, optionArray){
  mountDefaultAction(wx);  ////挂载默认事件
  let emptyFunc = function(){};
  if(Array.isArray(optionArray)){
    optionArray.forEach(item => {
      switch(item.type){
        case 'a' :
          if(item.bindtap){
            wx.wxParseTagATap = typeof item.bindtap === 'function' ? item.bindtap : emptyFunc;
          }
          break;
        case 'img' :
          if(item.bindtap){
            wx.wxParseImgTap = typeof item.bindtap === 'function' ? item.bindtap : emptyFunc;
          }
        default:;
      }
    })
  }
}
// module.exports = {
//     mountAction: mountAction
// }
export default mountAction;
  