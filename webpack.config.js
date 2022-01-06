const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const tsChecker = require('fork-ts-checker-webpack-plugin');

const buildPath = path.resolve(__dirname, 'build');
const srcPath = path.resolve(__dirname, 'src');
const isProd = process.env.NODE_ENV === 'production';

const getSettingsForStyles = (withModules = false) => {
    return ['style-loader', !withModules ? 'css-loader' : {
        loader: 'css-loader',
        options: {
            modules: {
                localIdentName: !isProd ? '[path][name]__[local]' : '[hash:base64]'
            }
        }
    },
    'sass-loader']
}

// {
//     loader: 'post-loader',
//     options: {
//         postcssOptions: {
//             plugins: ['autoprefixer']
//         }
//     }
// },

module.exports = {
    entry: path.join(srcPath, './index.tsx'),
    target: !isProd ? 'web' : 'browserslist',
    devtool: isProd ? 'hidden-source-map' : 'eval-source-map',
    output: {
        path: buildPath,
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(srcPath, './index.html'),
            favicon: path.join(srcPath, './favicon.ico')
        }),
        !isProd && new ReactRefreshWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]-[hash].css'
        }),
        new tsChecker(),
    ].filter(Boolean),
    module: {
        rules: [
            {
                test: /\.module\.s?css$/,
                use: getSettingsForStyles(true)
            },
            {
                test: /\.s?css$/,
                exclude: /\.module\.s?css$/,
                use: getSettingsForStyles()
            },
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader'
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            components: path.join(srcPath, 'components'),
            img: path.join(srcPath, 'img'),
            pages: path.join(srcPath, 'pages'),
            store: path.join(srcPath, 'store'),
            styles: path.join(srcPath, 'styles'),
            utils: path.join(srcPath, 'utils'),
        }
    },
    devServer: {
        host: '127.0.0.1',
        port: 9000,
        hot: true,
        historyApiFallback: true
    }
}