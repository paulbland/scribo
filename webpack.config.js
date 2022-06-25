var webpack = require('webpack');

module.exports = {
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
                    plugins: ['transform-runtime'],
                    presets: ['es2015']
                }
            },
            { 
                test: /\.hbs$/, 
                loader: 'handlebars-loader',
                options: {
                    runtime: __dirname + "/client/src/js/helpers/helpers.js",
                    precompileOptions: {
                        knownHelpersOnly: false,
                      }
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
    // resolve: {
    //     alias: {
    //        handlebars: '/node_modules/handlebars/dist/handlebars.min.js'
    //     }
    // },
    watch: true
}


// do this i think
//path.resolve(__dirname, "..."),