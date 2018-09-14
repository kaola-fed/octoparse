/**
 * html2Json 改造来自: https://github.com/Jxck/html2json
 * 
 */
import {
    urlToHttpUrl,
    removeDOCTYPE,
    trimHtml
} from './utils/index'
import {HTMLParser} from './htmlparser'
import {
    block,
    inline,
    closeSelf,
    __placeImgeUrlHttps
} from './constant/index'


function html2json(html, bindName, options) {
    //处理字符串
    html = removeDOCTYPE(html);
    html = trimHtml(html);
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
            var node = {
                node: 'element',
                tag: tag,
            };
            ////节点预处理
            // let attrs = prehandleNode(node, _attrs, options);

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
                        node.styleStr = value;
                    }
                    if (value.match(/ /) && name !== 'style') {
                        value = value.split(' ');
                    }else if(value.match(/;/) && name === 'style'){
                        value = value.split(';');
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
            }

            //对img添加额外数据
            if (node.tag === 'img') {
                node.imgIndex = results.images.length;
                var imgUrl = node.attr.src;
                if (imgUrl[0] == '') {
                    imgUrl.splice(0, 1);
                }
                imgUrl = urlToHttpUrl(imgUrl, __placeImgeUrlHttps);
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
            if(!node.styleStr){
                node.styleStr = '';
            }
            if(!node.classStr){
                node.classStr = '';
            }
            ////调用插件
            if(Array.isArray(options.plugins)){
                options.plugins.forEach(plugin => {
                    if(typeof plugin === 'function'){
                        plugin(node);
                    }
                })
            }
            ////调用visitors 
            if(options.visitors){
                let func = options.visitors;
                if(func[node.tag]){
                    func[node.tag](node);
                }
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
                // textArray:transEmojiStr(text)
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
/////节点预处理
function prehandleNode(node = {}, attrs = [], options = {}){
    if(testNodeWithOptions(node, attrs, options)){
        if(Array.isArray(options[node.tag].removeAttrs)){
            options[node.tag].removeAttrs.forEach(attr => {
                attrs = attrs.filter(i => {
                    i.name !== attr
                })
            })
        }
        if(Array.isArray(options[node.tag].addAttrs)){
            options[node.tag].addAttrs.forEach(attr => {
                if(attrs.find(i => i.name === attr.name)){
                    let i = attrs.find(i => i.name === attr.name);
                    i.value = attr.name === 'id'?attr.value:`${i.value} ${attr.value}`
                }else{
                    attrs.push(attr);
                }
            })
        }
    }
    return attrs;
};
///////测试节点是否是要处理的节点
function testNodeWithOptions(node = {}, attrs, options = {}){
    if(!options[node.tag]){
        return false;
    }
    let testInclude = true;
    let testExcept = true;
    let option = options[node.tag];
    let includeTestStr = option.include ? option.include : '';
    let exceptTestStr = option.except ? option.except : '';
    ///如果有include配置项
    if(includeTestStr){
        if(includeTestStr.indexOf('.') === 0){
            let testClassStr = includeTestStr.slice(1);
            let classStr = attrs.find(i => i.name === 'class')?attrs.find(i => i.name === 'class').value:'';
            if(classStr && classStr.indexOf(testClassStr)!== -1){
                testInclude = true;
            }else{
                testInclude = false;
            }
        }
        else if(includeTestStr.indexOf('#') === 0){
            let testIdStr = includeTestStr.slice(1);
            let idStr = attrs.find(i => i.name === 'id')?attrs.find(i => i.name === 'id').value:'';
            if(idStr === testIdStr){
                testInclude = true;
            }else{
                testInclude = false;
            }
        }
    }
    ///如果有except配置项
    if(exceptTestStr){
        if(exceptTestStr.indexOf('.') === 0){
            let testClassStr = exceptTestStr.slice(1);
            let classStr = attrs.find(i => i.name === 'class')?attrs.find(i => i.name === 'class').value:'';
            if(classStr && classStr.indexOf(testClassStr)!== -1){
                testExcept = false;
            }else{
                testExcept = true;
            }
        }
        else if(exceptTestStr.indexOf('#') === 0){
            let testIdStr = exceptTestStr.slice(1);
            let idStr = attrs.find(i => i.name === 'id')?attrs.find(i => i.name === 'id').value:'';
            if(idStr === testIdStr){
                testExcept = false;
            }else{
                testExcept = true;
            }
        }
    }

    return testInclude && testExcept
};

export{
    html2json
}

