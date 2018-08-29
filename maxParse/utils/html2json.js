/**
 * html2Json 改造来自: https://github.com/Jxck/html2json
 * 
 * 
 * author: Di (微信小程序开发工程师)
 * organization: WeAppDev(微信小程序开发论坛)(http://weappdev.com)
 *               垂直微信小程序开发交流社区
 * 
 * github地址: https://github.com/icindy/wxParse
 * 
 * for: 微信小程序富文本解析
 * detail : http://weappdev.com/t/wxparse-alpha0-1-html-markdown/184
 */

var __placeImgeUrlHttps = "https";
var __emojisReg = '';
var __emojisBaseSrc = '';
var __emojis = {};
var wxDiscode = require('./wxDiscode.js');
var HTMLParser = require('./htmlparser.js');
// Empty Elements - HTML 5
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr");
// Block Elements - HTML 5
var block = makeMap("br,a,code,address,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video");

// Inline Elements - HTML 5
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,var");

// Elements that you can, intentionally, leave open
// (and which close themselves)
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr");

// Attributes that have their values filled in disabled="disabled"
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected");

// Special Elements (can contain anything)
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
function makeMap(str) {
    var obj = {}, items = str.split(",");
    for (var i = 0; i < items.length; i++)
        obj[items[i]] = true;
    return obj;
}
////为obj添加action
function addActionByFilter(obj, i){
    if(i.filter){
        if(i.filter.startsWith('.')){
            // console.log('发现class')
            let targetClass = i.filter.slice(1);
            Object.keys(i.action).forEach(key => {
                if(typeof i.action[key] == 'function'){
                    if(!obj[i.type]['action']['class'][targetClass]){
                        obj[i.type]['action']['class'][targetClass] = {};
                    }
                    obj[i.type]['action']['class'][targetClass][key] = i.action[key];
                }
            })
            // for(var act in i.action){
            //     // if(i.action.hasOwnProperty(act)){
            //         // obj[i.type].action.class[targetClass][act] = i.action[act]
            //         console.log('现在obj是', obj)
            //     // }
            // }
            
        }else if(i.filter.startsWith('#')){
            let targetId = i.filter.slice(1);
            Object.keys(i.action).forEach(key => {
                if(typeof i.action[key] == 'function'){
                    if(!obj[i.type]['action']['id'][targetId]){
                        obj[i.type]['action']['id'][targetId] = {};
                    }
                    obj[i.type]['action']['id'][targetId][key] = i.action[key];
                }
            })
            // for(let act in i.action){
            //     if(i.action.hasOwnProperty(act) && typeof act == 'function'){
            //         obj[i.type].action.id[targetId][act] = i.action[act]
            //     }
            // }
        }
    }else{
        for(let act in i.action){
            if(i.action.hasOwnProperty(act) && typeof act == 'function'){
                obj[i.type].action.base[act] = i.action[act]
            }
        } 
        Object.keys(i.action).forEach(key => {
            if(typeof i.action[key] == 'function'){
                if(!obj[i.type]['action']['base']){
                    obj[i.type]['action']['base'] = {};
                }
                obj[i.type]['action']['base'][key] = i.action[key];
            }
        })
    }
    console.log('挂载完毕后obj是', obj)
}
///  
///  整理用户的事件绑定规则
function makeMapByArray(array){
    let obj = {};
    array.forEach(i => {
        if(!obj[i.type]){
            obj[i.type] = {
                type: i.type,
                action:{
                    base:{},
                    class:{},
                    id:{}
                }
            }
            addActionByFilter(obj, i);
        }else{
            addActionByFilter(obj, i);
        }
    })
    return obj;
}
////为attr添加action
function addActionByAttr(attr, tag, actionMap){
    console.log('触发了这个函数, tag是', tag);
    console.log('actionMap是', actionMap);
    if(!actionMap)
        return;
    if(!actionMap[tag])
        return;
    console.log('走到了这里')
    let actionObj = actionMap[tag].action;
    // if(!attr.action){
    //     attr.action = {};
    // }
    attr.action = Object.assign({}, actionObj.base);
    if(attr.id){
        if(actionObj.id[attr.id]){
            attr.action = Object.assign(attr.action, actionObj.id[attr.id]);
        }
    }else if(attr.class && Array.isArray(attr.class)){
        attr.class.forEach(i => {
            if(actionObj.class[i]){
                attr.action = Object.assign(attr.action, actionObj.class[i]);
            }
        })
    }else if(attr.class){
        if(actionObj.class[attr.class]){
            attr.action = Object.assign(attr.action, actionObj.class[attr.class]);
        }
    }
}


function q(v) {
    return '"' + v + '"';
}

function removeDOCTYPE(html) {
    return html
        .replace(/<\?xml.*\?>\n/, '')
        .replace(/<.*!doctype.*\>\n/, '')
        .replace(/<.*!DOCTYPE.*\>\n/, '');
}

function trimHtml(html) {
  return html
        .replace(/\r?\n+/g, '')
        .replace(/<!--.*?-->/ig, '')
        .replace(/\/\*.*?\*\//ig, '')
        .replace(/[ ]+</ig, '<')
}


function html2json(html, bindName, option) {
    //整理用户的事件绑定规则
    let actionMap = '';
    console.log('option是', option);
    if(Array.isArray(option)){
        actionMap = makeMapByArray(option);
    }
    //处理字符串
    html = removeDOCTYPE(html);
    html = trimHtml(html);
    html = wxDiscode.strDiscode(html);
    //生成node节点
    var bufArray = [];
    var results = {
        node: bindName,
        nodes: [],
        images:[],
        imageUrls:[]
    };
    var index = 0;
    HTMLParser(html, {
        start: function (tag, attrs, unary) {
            //debug(tag, attrs, unary);
            // node for this element
            var node = {
                node: 'element',
                tag: tag,
            };

            if (bufArray.length === 0) {
                node.index = index.toString()
                index += 1
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                node.index = parent.index + '.' + parent.nodes.length
            }

            if (block[tag]) {
                node.tagType = "block";
            } else if (inline[tag]) {
                node.tagType = "inline";
            } else if (closeSelf[tag]) {
                node.tagType = "closeSelf";
            }

            if (attrs.length !== 0) {
                node.attr = attrs.reduce(function (pre, attr) {
                    var name = attr.name;
                    var value = attr.value;
                    if (name == 'class') {
                        // console.dir(value);

                        //  value = value.join("")
                        node.classStr = value;
                    }
                    // has multi attibutes
                    // make it array of attribute
                    if (name == 'style') {
                        // console.dir(value);
                        //  value = value.join("")
                        node.styleStr = value;
                    }
                    if (value.match(/ /)) {
                        value = value.split(' ');
                    }
                    

                    // if attr already exists
                    // merge it
                    if (pre[name]) {
                        if (Array.isArray(pre[name])) {
                            // already array, push to last
                            pre[name].push(value);
                        } else {
                            // single value, make it array
                            pre[name] = [pre[name], value];
                        }
                    } else {
                        // not exist, put it
                        pre[name] = value;
                    }

                    return pre;
                }, {});
                ///为attr增加action绑定
                addActionByAttr(node.attr, node.tag, actionMap);
            }

            //对img添加额外数据
            if (node.tag === 'img') {
                node.imgIndex = results.images.length;
                var imgUrl = node.attr.src;
                if (imgUrl[0] == '') {
                    imgUrl.splice(0, 1);
                }
                imgUrl = wxDiscode.urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
                node.attr.src = imgUrl;
                node.from = bindName;
                // node.bindtap = test;
                results.images.push(node);
                results.imageUrls.push(imgUrl);
            }
            
            // 处理font标签样式属性
            if (node.tag === 'font') {
                var fontSize = ['x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', '-webkit-xxx-large'];
                var styleAttrs = {
                    'color': 'color',
                    'face': 'font-family',
                    'size': 'font-size'
                };
                if (!node.attr.style) node.attr.style = [];
                if (!node.styleStr) node.styleStr = '';
                for (var key in styleAttrs) {
                    if (node.attr[key]) {
                        var value = key === 'size' ? fontSize[node.attr[key]-1] : node.attr[key];
                        node.attr.style.push(styleAttrs[key]);
                        node.attr.style.push(value);
                        node.styleStr += styleAttrs[key] + ': ' + value + ';';
                    }
                }
            }

            //临时记录source资源
            if(node.tag === 'source'){
                results.source = node.attr.src;
            }
            
            if (unary) {
                // if this tag doesn't have end tag
                // like <img src="hoge.png"/>
                // add to parents
                var parent = bufArray[0] || results;
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            } else {
                bufArray.unshift(node);
            }
        },
        end: function (tag) {
            //debug(tag);
            // merge into parent tag
            var node = bufArray.shift();
            if (node.tag !== tag) console.error('invalid state: mismatch end tag');

            //当有缓存source资源时于于video补上src资源
            if(node.tag === 'video' && results.source){
                node.attr.src = results.source;
                delete results.source;
            }
            
            if (bufArray.length === 0) {
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                parent.nodes.push(node);
            }
        },
        chars: function (text) {
            //debug(text);
            var node = {
                node: 'text',
                text: text,
                textArray:transEmojiStr(text)
            };
            
            if (bufArray.length === 0) {
                node.index = index.toString()
                index += 1
                results.nodes.push(node);
            } else {
                var parent = bufArray[0];
                if (parent.nodes === undefined) {
                    parent.nodes = [];
                }
                node.index = parent.index + '.' + parent.nodes.length
                parent.nodes.push(node);
            }
        },
        comment: function (text) {
            //debug(text);
            // var node = {
            //     node: 'comment',
            //     text: text,
            // };
            // var parent = bufArray[0];
            // if (parent.nodes === undefined) {
            //     parent.nodes = [];
            // }
            // parent.nodes.push(node);
        },
    });
    return results;
};

function transEmojiStr(str){
  // var eReg = new RegExp("["+__reg+' '+"]");
//   str = str.replace(/\[([^\[\]]+)\]/g,':$1:')
  
  var emojiObjs = [];
  //如果正则表达式为空
  if(__emojisReg.length == 0 || !__emojis){
      var emojiObj = {}
      emojiObj.node = "text";
      emojiObj.text = str;
      array = [emojiObj];
      return array;
  }
  //这个地方需要调整
  str = str.replace(/\[([^\[\]]+)\]/g,':$1:')
  var eReg = new RegExp("[:]");
  var array = str.split(eReg);
  for(var i = 0; i < array.length; i++){
    var ele = array[i];
    var emojiObj = {};
    if(__emojis[ele]){
      emojiObj.node = "element";
      emojiObj.tag = "emoji";
      emojiObj.text = __emojis[ele];
      emojiObj.baseSrc= __emojisBaseSrc;
    }else{
      emojiObj.node = "text";
      emojiObj.text = ele;
    }
    emojiObjs.push(emojiObj);
  }
  
  return emojiObjs;
}

function emojisInit(reg='',baseSrc="/wxParse/emojis/",emojis){
    __emojisReg = reg;
    __emojisBaseSrc=baseSrc;
    __emojis=emojis;
}
////测试事件
function test(){
    console.log('test')
}
// 图片点击事件
function wxParseImgTap(e) {
    console.log('触发了点击!!!',e)
    var that = this;
    var nowImgUrl = e.target.dataset.src;
    var tagFrom = e.target.dataset.from;
    if (typeof (tagFrom) != 'undefined' && tagFrom.length > 0) {
      wx.previewImage({
        current: nowImgUrl, // 当前显示图片的http链接
        urls: that.data[tagFrom].imageUrls // 需要预览的图片http链接列表
      })
    }
  }

module.exports = {
    html2json: html2json,
    emojisInit:emojisInit
};

