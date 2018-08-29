import maxParse from './maxParse';
import mountAction from './mountAction';
////option
///
function quickParse({type='html', data='<div class="color:red;">数据不能为空</div>', page, mountEvent=[]}){
    let maxRes = maxParse({type, data, mountEvent});
    console.log('返回结果是', maxRes);
    return maxRes;
}
export {
    maxParse,
    mountAction,
    quickParse
}