const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: __dirname + '/client/src/js/app.js',
    output: {
        path: __dirname + '/client/dist',
        filename: 'scribo.bundle.js'
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
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 
                    {
                        loader: 'sass-loader',
                        options: {
                          implementation: require('sass'), // Ensures Dart Sass is used
                          sassOptions: {
                            quietDeps: true, // Suppresses deprecation warnings from dependencies
                          },
                        },
                      }
                ],
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery',
          _: 'underscore'
        }),
        new CopyPlugin({
            patterns: [
                { from: __dirname + "/client/src/img/*", to: __dirname + "/client/dist/img/[name][ext]" },
                { from: __dirname + "/client/src/manifest.json", to: __dirname + "/client/dist/[name][ext]" },
                { from: __dirname + "/client/src/css/index.css", to: __dirname + "/client/dist/css/[name][ext]" }
            ],
        }),
        new ESLintPlugin()
    ]
}

// do this i think
//path.resolve(__dirname, "..."),
