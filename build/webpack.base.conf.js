const path = require("path");
const resolve = function(dir){
    return path.join(__dirname,"..",dir);
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
const conf = require("../conf");

module.exports = {
    context: path.resolve(__dirname, '../'),
    entry:{
        app:"./src/index",
    },
    target:"web",
    output:{
        path:resolve("dist"),
        filename:"[name].js",
        publicPath:process.env.NODE_ENV === "development"?conf.dev.assetsPublicPath:conf.dev.assetsPublicPath
    },
    externals:{

    },
    resolve:{
        extensions: ['.js', '.ts', '.json'],
    },
    module:{
        rules:[
            {
                test:"/\.ts$/",
                loader:"ts-loader",
                include:[resolve("src"),resolve("jest")]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
          }),
    ],
    mode:"development"
}