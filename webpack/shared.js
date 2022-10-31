const path = require('path');
const root = path.resolve(__dirname);

module.exports = {
    constant: {
        WEBPACK_MODE: ['development', 'production'],
    },
    commonPath: {
        entryApp: path.join(root, '..', 'build', 'tmp'),
        output: path.join(root, '..', 'build', 'public', 'pages'),
    }
}