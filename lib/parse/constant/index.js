"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__placeImgeUrlHttps = exports.special = exports.fillAttrs = exports.closeSelf = exports.inline = exports.block = exports.empty = exports.attr = exports.endTag = exports.startTag = void 0;
// Regular Expressions for parsing tags and attributes
var startTag = /^<([-A-Za-z0-9_]+)((?:\s+[a-zA-Z_:][-a-zA-Z0-9_:.]*(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)>/;
exports.startTag = startTag;
var endTag = /^<\/([-A-Za-z0-9_]+)[^>]*>/;
exports.endTag = endTag;
var attr = /([a-zA-Z_:][-a-zA-Z0-9_:.]*)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|([^>\s]+)))?/g; // Empty Elements - HTML 5

exports.attr = attr;
var empty = makeMap("area,base,basefont,br,col,frame,hr,img,input,link,meta,param,embed,command,keygen,source,track,wbr"); // Block Elements - HTML 5

exports.empty = empty;
var block = makeMap("a,address,code,article,applet,aside,audio,blockquote,button,canvas,center,dd,del,dir,div,dl,dt,fieldset,figcaption,figure,footer,form,frameset,h1,h2,h3,h4,h5,h6,header,hgroup,hr,iframe,ins,isindex,li,map,menu,noframes,noscript,object,ol,output,p,pre,section,script,table,tbody,td,tfoot,th,thead,tr,ul,video"); // Inline Elements - HTML 5

exports.block = block;
var inline = makeMap("abbr,acronym,applet,b,basefont,bdo,big,br,button,cite,del,dfn,em,font,i,iframe,img,input,ins,kbd,label,map,object,q,s,samp,script,select,small,span,strike,strong,sub,sup,textarea,tt,u,let"); // Elements that you can, intentionally, leave open
// (and which close themselves)

exports.inline = inline;
var closeSelf = makeMap("colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr"); // Attributes that have their values filled in disabled="disabled"

exports.closeSelf = closeSelf;
var fillAttrs = makeMap("checked,compact,declare,defer,disabled,ismap,multiple,nohref,noresize,noshade,nowrap,readonly,selected"); // Special Elements (can contain anything)

exports.fillAttrs = fillAttrs;
var special = makeMap("wxxxcode-style,script,style,view,scroll-view,block");
exports.special = special;
var __placeImgeUrlHttps = "https";
exports.__placeImgeUrlHttps = __placeImgeUrlHttps;

function makeMap(str) {
  var obj = {},
      items = str.split(",");

  for (var i = 0; i < items.length; i++) {
    obj[items[i]] = true;
  }

  return obj;
}