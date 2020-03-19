var octoParse = require('../../lib/index.js')
Page({
  onLoad(query) {
    // 页面加载
    var article = `<div class="ali_title">OCTOPATH TRAVELER</div>
    <span>文本1</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span>文本2</span>
    <img class="ali_img" src="http://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540183348581&di=507d478e517ac2ef9472f89446239f7a&imgtype=0&src=http%3A%2F%2Fcms-bucket.nosdn.127.net%2F2018%2F07%2F18%2Faec8e5f0492247d78f49cdc3155c463e.jpeg" alt="octoparse">`;

    var article = '<div><div><div><a href="index">kaola</a></div></div></div>'
    let maxRes = octoParse.htmlParse(article)
    this.setData({
      article: maxRes
    })
  },
  onReady() {
    // 页面加载完成
  },
  onShow() {
    // 页面显示
  },
  onHide() {
    // 页面隐藏
  },
  onUnload() {
    // 页面被关闭
  },
  onTitleClick() {
    // 标题被点击
  },
  onPullDownRefresh() {
    // 页面被下拉
  },
  onReachBottom() {
    // 页面被拉到底部
  },
  onShareAppMessage() {
    // 返回自定义分享信息
    return {
      title: 'My App',
      desc: 'My App description',
      path: 'pages/index/index',
    };
  },
});
