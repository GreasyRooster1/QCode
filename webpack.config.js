const path = require('path');

module.exports = {
    mode:"development",
    entry:{
        index: "./src/js/index.js",
        editor: "./src/editor/js/index.js",
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};