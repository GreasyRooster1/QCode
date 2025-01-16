const path = require('path');

module.exports = {
    mode:"development",
    entry:{
        index: "./src/js/index.js",
        editor: "./src/editor/js/index.js",
        login: "./src/login/js/login.js",
        admin: "./src/login/js/admin.js",
        lessons: "./src/lessons/js/index.js",
        adminConsole: "./src/admin/js/index.js",
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
};