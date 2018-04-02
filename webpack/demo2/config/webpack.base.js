/*
 * @File: 该版本是create-react-app-leomYili的webpack基础配置文件,用于收集打包过程中基础的配置文件
 * @Author: leomYili 
 * @Date: 2018-02-08 16:05:39 
 * @Last Modified by: leomy@outlook.com
 * @Last Modified time: 2018-02-11 09:03:11
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const paths = require("./paths");
const webpack = require("webpack");

module.exports = {
    //entry: "./src/js/index.js",
    entry: paths.entries,
    output: {
        filename: "static/js/[name].[chunkhash:8].js",
        path: paths.appBuild
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["env", "react"]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true
                            }
                        }
                    ]
                })
            }
        ]
    },
    externals: {
        'react': "react",
        "react-dom":"react-dom",
    },
    resolve: {
        extensions: [".js", ".jsx"] // 同时支持 js 和 jsx
    },
    plugins: [
        new CleanWebpackPlugin("../build/*.*", {
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            minChunks: 2
        }),
        // 所有的第三方库都会以dll的方式打包到一起
        new webpack.DllReferencePlugin({
            context: paths.appBuild,
            manifest: require("../build/static/lib/react_base_framework-manifest.json")
        })
    ]
};
