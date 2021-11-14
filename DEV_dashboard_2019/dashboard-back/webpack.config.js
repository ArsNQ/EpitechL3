const path = require("path");
const nodeExternals = require('webpack-node-externals');
module.exports = {
    mode: "production",
    entry: [
        path.join(__dirname, './index.js')
    ],
    output: {
        path: path.resolve(__dirname, "./dist/"),
        filename: "index.js"
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: { presets: ["@babel/env"] },
            },
        ]
    },
    resolve: {
        extensions: [".js"],
    },
};

