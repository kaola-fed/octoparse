function urlToHttpUrl(url,rep){
    
    var patt1 = new RegExp("^//");
    var result = patt1.test(url);
    if(result){
        url = rep+":"+url;
    }
    return  url;
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

export {
    urlToHttpUrl,
    removeDOCTYPE,
    trimHtml
}