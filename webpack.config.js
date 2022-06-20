
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { NODE_ENV } = process.env;
console.log(NODE_ENV);

module.exports = {
    mode:NODE_ENV === 'prod' ? 'production':'development',
    entry:'./src/index',
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'build.js'
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins:[
        //配置全局变量
        new HtmlWebpackPlugin({
            template:'./public/index.html',
            inject:'body'
        }),
        new webpack.DefinePlugin({
            'REACT_ENV':JSON.stringify(NODE_ENV)
        })
    ]
}