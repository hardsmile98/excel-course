const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: ['@babel/polyfill','./app.js'],
    output: {
        filename: 'bundle.[chunkhash].js',
        path: path.resolve(__dirname,'public')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.resolve(__dirname,'src'),
            '@core': path.resolve(__dirname,'src/core')
        }
    },
    devServer: {
        port: 3000
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
              { from: path.resolve(__dirname,'src/favicon.ico'), to: path.resolve(__dirname,'public')}
            ],
        }),
        new MiniCssExtractPlugin({
            filename: 'bundle.[hash].css'
        })
    ],
    module: {
        rules: [
          {
            test: /\.s[ac]ss$/i,
            use: [MiniCssExtractPlugin.loader,'css-loader','sass-loader']
          },
          { 
            test: /\.js$/, 
            exclude: /node_modules/, 
            loader: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env']
                }
            } 
          }
        ]
    }
}