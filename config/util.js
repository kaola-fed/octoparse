const path = require('path');

const root = path.join(__dirname, '../');

module.exports = {
    resolve: function resolve(...args) {
        return path.resolve(root, ...args);
    }
}