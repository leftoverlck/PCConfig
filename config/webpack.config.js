const path = require('node:path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: 'app.js',
    },
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    context: path.resolve(__dirname, '../src', 'assets'),
                    from: '**/*',
                    to: path.resolve(__dirname, '../dist', 'assets'),
                },
            ],
        }),,
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../templates/index.html'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env', '@babel/preset-react'],
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '@components': path.resolve(__dirname, '../src/components'),
        },
    },
};

module.exports = config;
