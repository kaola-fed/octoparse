
## octoparse

**octoparse**是一款html解析转换工具。可以将html解析成对象并转换成其他文本。支持html转微信小程序、支付宝小程序与百度小程序。

## 快速开始

### 下载
```html
    npm install octoparse
```

### 直接使用

```html
    import octoparse from 'octoparse'
    
    let htmlStr = 
            `<div>
                <p>test</p>
                <img id="img1" class=".test .testImg2"  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3492149706,1549268323&fm=26&gp=0.jpg" alt="test" title="girl">
             </div>`;
    let res = octoparse.htmlParse(htmlStr)
```


### 在vue中以插件方式使用

```html
    import Vue from 'vue'
    import octoparse from 'octoparse'
    Vue.use(octoparse)
    
    let htmlStr = 
        `<div>
            <p>test</p>
            <img id="img1" class=".test .testImg2"  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3492149706,1549268323&fm=26&gp=0.jpg" alt="test" title="girl">
        </div>`;
    let res = Vue.$htmlParse(htmlStr)
```
### 在小程序中使用
1、在小程序模板中引入octoparse模板

* 此处的data的key需要为nodes以便和octoparse小程序模板的入口模板保持一致
* 此处的例子为微信小程序，支付宝小程序的使用方式基本相同，注意引用的模板为platform/alipay/index.axml
```html
<import src="node_modules/octoparse/lib/platform/wechat/index.wxml"/> 
<view class="octoParse">
    <template is="octoParse" data="{{nodes:htmlData}}"/>
</view>
```
2、 在page中挂载数据
```html
    import octoparse from 'octoparse'
    
    Page({
        ...
        onLoad: function(){
            let htmlStr = 
            `<div>
                <p>test</p>
                <img id="img1" class=".test .testImg2"  src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3492149706,1549268323&fm=26&gp=0.jpg" alt="test" title="girl">
             </div>`;
            let res = octoparse.htmlParse(htmlStr)
            
            this.setData({
                htmlData: res   
            })
        }
        ...
    })

```
### 在Megola中使用

[Megola 基于Vue的跨平台小程序开发框架](https://github.com/kaola-fed/megalo)

1、在webpack中配置挂载小程序模板
```html
    module.exports = {
        ...
        target: createMegaloTarget( {
            compiler: Object.assign( compiler, {}),
            platform: 'wechat',
            htmlParse: {
                templateName: 'octoParse',
                src: resolve('node_modules/octoparse/lib/platform/wechat')
            }
        }),
         ...
    }

```
2、在vue上挂载octoparse
```html
    import Vue from 'vue'
    import octoparse from 'octoparse'
    Vue.use(octoparse)
```
3、在页面中使用
```html
    <div v-html="vhtml">
    </div>
    
    data(){
        return {
           vhtml:`<div><p>test</p></div>`
        }
    }
```

### 基本使用

将html转换为树结构

```html
    let htmlStr = 
            `<div>
                <p>test</p>
                <img style="width:200px;height:200px;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3492149706,1549268323&fm=26&gp=0.jpg" alt="test" title="girl">
             </div>`;
    let res = octoparse.htmlParse(htmlStr)

```

### 节点预处理

使用visitors方法对解析的html节点进行处理。

例如：为所有的img图片加上display:block样式去除连续图片中间的缝隙

```html
    let options = {
      visitors: {
        img(node){
          node.styleStr = 'display:block';
        }
      }
    }
    let htmlStr = 
            `<img src="//pop.nosdn.127.net/e2170dcf-efd0-4906-9da9-3a9900e52b39">
            <img src="//pop.nosdn.127.net/929408c3-7a72-44d2-9b11-8d5c6ea98dbb">`;
    let res = octoparse.htmlParse(htmlStr, options)
```
#### 节点属性释义

| 属性名 | 含义 | 注释 |
| ------ | ------ | ------ |
| node | 节点类型 |  |
| tag | 节点标签名 |  |
| index | 节点在节点树中的序列号 | |
| attr | 属性键值对 |  |
| classStr | class字符串 | 在模板中使用该属性使class生效|
| styleStr | style字符串 | 在模板中使用该属性使style生效 |
| nodes | 子节点数组 |  |


参考： [访问者模式](https://zh.wikipedia.org/wiki/%E8%AE%BF%E9%97%AE%E8%80%85%E6%A8%A1%E5%BC%8F)


### 使用插件

支持插件，例如：

```html
    import removeBackground from '../../lib/plugins/removeBackground';
    let options = {
        plugins: [removeBackground],
    }
    let htmlStr = 
            `<div>
                <p>test</p>
                <img style="width:200px;height:200px;" src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3492149706,1549268323&fm=26&gp=0.jpg" alt="test" title="girl">
             </div>`;
    let res = octoparse.htmlParse(htmlStr, options)
```

### 本地开发

* git clone https://github.com/kaola-fed/octoparse.git
* cd octoparse
* npm i
* npm install gulp -g  (安装一下gulp)
* npm run build
* gulp (因为小程序不允许引用根目录以外的文件，所以这里跑一下gulp任务将模板拷贝到小程序demo的目录下面)



## 灵感来源

名字来源于游戏 `octopath tarveler`。项目启发自 `wxParse`。

<p align="center"><img src="https://gss3.bdstatic.com/-Po3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=4cadfc03b88f8c54f7decd7d5b404690/b219ebc4b74543a961dac02112178a82b801141d.jpg"></p>
