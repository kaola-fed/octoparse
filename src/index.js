import {htmlParse, install} from './octoParse';
import mountAction from './mountAction';
let octoparse = {
    htmlParse,
    install,
    mountAction
}
module.exports = octoparse;
export default octoparse;