/* eslint-disable */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const Dotenv = require('dotenv-webpack');

const path = require('path');

const BUILD_DIR = path.join(__dirname, 'build');

let babelLoader = { loader: 'babel-loader' };

let tsLoader = {
    loader: 'ts-loader',
    // options: {
    //     transpileOnly: true,
    // },
}

let htmlLoader = { loader: 'html-loader' };
let sassLoader = { loader: 'sass-loader', options: { sourceMap: true } };
let cssLoader = {
    loader: 'css-loader', options: {
        // sourceMap: true,
        modules: true,
        modules: {
            localIdentName: '[path][name]__[local]--[hash:base64:5]',
        },
    }
};
let cssModulesTypescriptLoader = { loader: 'css-modules-typescript-loader' };
let miniCssExtractLoader = { loader: MiniCssExtractPlugin.loader };
let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// let styleLoader = { loader: 'style-loader' };
let fileLoader = { loader: 'file-loader', options: { name: '[name]--[contenthash].[ext]' } };
let urlLoader = {
    loader: 'url-loader', options: {
        limit: 8192,
        fallback: fileLoader,
    }
};
let yamlLoader = {
    loader: 'yaml-loader',
}

var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const MAIN = {
    mode: 'production',
    target: 'web',
    devtool: 'inline-source-map',
    entry: {
        app: [
            './apexstats/main.tsx', 
            './apexstats/vendor.ts',
        ],
    },
    output: {
        path: BUILD_DIR,
        filename: "./[name].bundle.js",
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: [".ts", ".tsx", ".js"],
        plugins: [
            new TsconfigPathsPlugin(),
        ],
    },
    module: {
        rules: [
            { test: /\.tsx?$/i, use: [babelLoader, tsLoader] },
            { test: /\.html$/i, use: [htmlLoader] },
            { test: /\.s[ac]ss/i, use: [miniCssExtractLoader, cssModulesTypescriptLoader, cssLoader, sassLoader] },
            { test: /\.(png|jpe?g|gif)$/i, use: [urlLoader] },
            { test: /\.ya?ml$/i, use: [yamlLoader], type: 'json'},
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new CssMinimizerPlugin(),
        new ForkTsCheckerWebpackPlugin(),
        new HtmlWebPackPlugin({
            template: "./apexstats/index.html",
            filename: "./index.html",
        }),
        new DefinePlugin({
            APP_DIR: JSON.stringify(BUILD_DIR),
        }),
        new Dotenv({ systemvars: true }),
    ],
    optimization: {
        splitChunks: { chunks: 'all' },
        // minimize: true,
        // minimizer: [
        //     new CssMinimizerPlugin(),
        // ]
    },
    devServer: {
        open: true,
    }
}

module.exports = [MAIN];