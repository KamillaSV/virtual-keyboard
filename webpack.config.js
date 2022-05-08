const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: { 
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js" 
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        }),
        new CopyWebpackPlugin({
            patterns: [
            { 
                from: path.resolve(__dirname, './src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]})
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.js$/,
                use: ["babel-loader"]
            },
            {
                test: /\.(ico|jpg|svg|png|gif)$/,
                use: ["file-loader"]
            }
        ]
    }
};
