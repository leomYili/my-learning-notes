const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const webpack = require("webpack");

module.exports = {
    context: paths.appSrc,
    devtool:false,
    entry: {
        home: "./views/home.js",
        about: "./views/about.js",
        user: "./views/user.js",
        react:['react','react-dom']
    },
    output: {
        filename: 'static/js/[name].[chunkhash:8].js',
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
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name:["common","react"],
            minChunks:2
        }),
        new HtmlWebpackPlugin({ //根据模板插入css/js等生成最终HTML
            filename: './home.html', //生成的html存放路径，相对于path
            template: paths.appHtml, //html模板路径
            inject: 'body', //js插入的位置，true/'head'/'body'/false
            hash: true, //为静态资源生成hash值
            chunks: ['react','common', 'home'],//需要引入的chunk，不配置就会引入所有页面的资源
            minify: { //压缩HTML文件    
                removeComments: true, //移除HTML中的注释
                collapseWhitespace: false //删除空白符与换行符
            }
        }),
        new CleanWebpackPlugin('build/*.*', {
            root: __dirname,
            verbose: true,
            dry: false
        })
    ]
};
