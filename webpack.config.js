/* eslint-disable */
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DefinePlugin = require('webpack').DefinePlugin;
const Dotenv = require('dotenv-webpack');
const ProvidePlugin = require('webpack').ProvidePlugin;
const path = require('path');

const BUILD_DIR = path.join(__dirname, 'build');


module.exports = env => {
    const prod = (!env || !env.development);

    let tsLoader = { loader: 'ts-loader', options: { compilerOptions: { sourceMap: !prod } } };
    let htmlLoader = { loader: 'html-loader' };
    let sassLoader = { loader: 'sass-loader', options: { sourceMap: !prod } };
    let cssLoader = {
        loader: 'css-loader',
        options: {
            sourceMap: !prod,
            modules: true,
            modules: {
                localIdentName: prod ? '[hash:base64:8]' : '[path][name]__[local]--[hash:base64:5]',
            },
        }
    };
    let cssModulesTypescriptLoader = { loader: 'css-modules-typescript-loader' };
    let miniCssExtractLoader = { loader: MiniCssExtractPlugin.loader };
    let CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
    let fileLoader = { loader: 'file-loader', options: { name: prod ? '[contenthash].ext' : '[name]--[contenthash].[ext]' } };
    let urlLoader = {
        loader: 'url-loader', options: {
            limit: 8192,
            fallback: fileLoader,
        }
    };
    let yamlLoader = {
        loader: 'yaml-loader',
        options: {
            merge: true,
        },
    };

    return {
        mode: prod ? 'production' : 'development',
        devtool: prod ? false : 'source-map',
        entry: {
            app: './apexstats/main.tsx',
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
                { test: /\.tsx?$/i, use: [tsLoader] },
                { test: /\.html$/i, use: [htmlLoader] },
                { test: /\.s[ac]ss/i, use: [miniCssExtractLoader, cssModulesTypescriptLoader, cssLoader, sassLoader] },
                { test: /\.(png|jpe?g|gif)$/i, use: [urlLoader] },
                { test: /\.ya?ml$/i, use: [yamlLoader], type: 'json' },
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
            new ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
            }),
        ],
        optimization: {
            moduleIds: 'natural',
            chunkIds: 'natural',
            splitChunks: {
                chunks: 'all',
                name: 'vendor',
                maxSize: 256000,
            },
            minimize: prod,
            minimizer: [
                new CssMinimizerPlugin(),
                '...',
            ]
        },
        devServer: {
            open: true,
            compress: true,
            progress: true,
            historyApiFallback: true,
        },
        cache: {
            type: 'filesystem',
        },
    };
};
