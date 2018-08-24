

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
    //我们可以在这里进行一些路由处理
    // if(href.indexOf(index) > 0){
    //   // wx.redirectTo({
    //   //   url: '../index/index'
    //   // })
    // }
}
  function mountAction(wx){
    wx.wxParseImgTap = wxParseImgTap;
    wx.wxParseTagATap = wxParseTagATap;
}
// module.exports = {
//     mountAction: mountAction
// }
export default mountAction;
  