const path = require('path');

module.exports = {
    mode:"development",
    entry:{
        adminConsole: "./src/adminConsole/index.js",
        adminLogin: "./src/adminLogin/index.js",
        editor: "./src/editor/index.js",
        exec: "./src/exec/index.js",
        index: "./src/index/index.js",
        lessons: "./src/lessons/index.js",
        login: "./src/login/index.js",
        shareBoard: "./src/shareBoard/index.js",
        sharedProject: "./src/sharedProject/index.js",
        editProfile: "./src/editProfile/index.js",

        theme: "./src/api/theme.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/i,
                use: [
                    // compiles Less to CSS
                    "style-loader",
                    "css-loader",
                    "less-loader",
                ],
            },
            {
                test: /\.txt$/i,
                use: 'raw-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js','.less'],
    },
    output: {
        filename: 'bundles/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },

};