import {html2json} from '../lib/parse/html2json'

let res_div = [{
    classStr: '',
    styleStr: '',
    index: '0',
    node: 'element',
    nodes: [{
        index: '0.0',
        node: 'text',
        text: 'test'
    }],
    tag: 'div',
    tagType: 'block'
}]
test('test html2json', () => {
    expect(html2json(`<div>test</div>`, 'root', {})).toEqual(res_div)
})