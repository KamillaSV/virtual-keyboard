const HTMLWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { resolve } = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const { config } = require('process');

const optimization = () => {
    if (isProd) {
        config.minimizer = [
            new CssMinimizerPlugin(),
            new TerserWebpackPlugin()
        ]
}}

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: { 
        path: path.resolve(__dirname, "dist"), 
        filename: "main.js" 
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CopyWebpackPlugin({
            patterns: [
            { 
                from: path.resolve(__dirname, './src/favicon.ico'),
                to: path.resolve(__dirname, 'dist')
            }
        ]}),
        new MiniCssExtractPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 
                [isDev ? "style-loader" : MiniCssExtractPlugin.loader,
                'css-loader']
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
    },
    optimization: optimization ()
};
