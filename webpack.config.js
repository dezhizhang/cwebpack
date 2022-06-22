const path = require("path");
const webpack = require("webpack");
const WebpckRunPlugin = require('./plugins/WebpckRunPlugin');
const { NODE_ENV } = process.env;


module.exports = {
    mode: NODE_ENV === "prod" ? "production" : "development",
    entry: "./src/index",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "build.js",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test:/\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader",
                  ],
            }
        ],
    },
    devServer: {
        static: path.resolve(__dirname, "public"),
        port: 8000,
        open: true,
    },
    plugins: [
        //配置全局变量
        // new HtmlWebpackPlugin({
        //     template: "./public/index.html",
        //     inject: "body",
        // }),
        // new webpack.DefinePlugin({
        //     REACT_ENV: JSON.stringify(NODE_ENV),
        // }),
        new WebpckRunPlugin(),
    ],
};
