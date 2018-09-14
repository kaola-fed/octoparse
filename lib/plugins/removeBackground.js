export default function removeBackground(node){
    if(typeof node.styleStr === 'string'){
        let reg = /background(.)*?;/i;
        node.styleStr = node.styleStr.replace(reg, '');
    }
}