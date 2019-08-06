const path = require('path')

module.exports = {
    entry: "./js/index.ts",
    output: {
        filename: '[name].js'
    },
    mode:"production",
    devtool: "source-map",
    resolve: {
        extensions: ['.ts']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    },
                    "ts-loader"
                ]
            }
        ]
    }


}