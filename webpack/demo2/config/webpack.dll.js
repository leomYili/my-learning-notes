const paths = require("./paths"),
    webpack = require("webpack"),
    library = "[name]_lib";

module.exports = {
    entry: {
        react_base_framework: [
            "react",
            "react-dom",
            "redux",
            "react-redux",
            "immutable",
            "babel-polyfill"
        ]
    },
    output: {
        filename: "./static/lib/[name].lib.js",
        path: paths.appBuild,
        library
    },
    plugins: [
        new webpack.DllPlugin({
            path: paths.appBuild + "/static/lib/[name]-manifest.json",
            // This must match the output.library option above
            name: library
        })
    ]
};
