var webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: __dirname + '/client/src/js/app.js',
    output: {
        path: __dirname + '/client/dist2',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                options: {
                    plugins: ['@babel/transform-runtime'],
                    presets: ["@babel/preset-env"]
                }
            },
            { 
                test: /\.hbs$/, 
                loader: 'handlebars-loader',
                options: {
                    runtime: __dirname + "/client/src/js/helpers/helpers.js"
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          _: 'underscore'
        })
    ],
    watch: true
}

// do this i think
//path.resolve(__dirname, "..."),
