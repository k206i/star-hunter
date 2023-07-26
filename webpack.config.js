const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: "./src/index.ts"
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                phaser: {
                    test: /[\\/]node_modules[\\/]phaser[\\/]/,
                    name: "phaser",
                    chunks: "all",
                },
            }
        }
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name]-[contenthash].bundle.js",
        assetModuleFilename: "asset-packs/[name]-[hash][ext][query]",
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg/,
                type: 'asset/inline'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.json/,
                type: "asset/resource",
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    devServer: {
        historyApiFallback: true,
        allowedHosts: 'all',
        static: {
            directory: path.resolve(__dirname, "./dist"),
        },
        open: true,
        hot: true,
        port: 8080,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "index.css"
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/index.html"),
            minify: false
        }),
        new CleanWebpackPlugin(),
        new CopyPlugin({
            patterns: [
                {
                    from: "static",
                    globOptions: {
                        // asset pack files are imported in code as modules
                        ignore: ["**/publicroot", "**/*-pack.json"]
                    }
                }
            ]
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    experiments: {
        topLevelAwait: true
    }
};
