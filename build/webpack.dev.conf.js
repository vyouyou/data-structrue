const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const baseConf = require("./webpack.base.conf");

module.exports = merge(baseConf,{
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: "development"
            }
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
        new webpack.NoEmitOnErrorsPlugin()
    ]
});