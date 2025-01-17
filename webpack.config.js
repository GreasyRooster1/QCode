const path = require('path');

module.exports = {
    mode:"development",
    entry:{
        adminConsole: "./src/login/adminConsole.js",
        adminLogin: "./src/login/adminLogin.js",
        editor: "./src/editor/js/index.js",
        index: "./src/js/index.js",
        login: "./src/login/js/login.js",
        lessons: "./src/lessons/js/index.js",
    },
    output: {
        filename: 'bundles/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
};