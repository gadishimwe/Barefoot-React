const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
require('dotenv').config();

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index_bundle.js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader'
				}
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }]
			},
			{
				test: /\.(png|woff|woff2|ttf|eot)($|\?)/i,
				use: {
					loader: 'url-loader?limit=5000'
				}
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: ['file-loader']
			},
			{ test: /\.jsx?$/, loader: 'babel-loader' },
			{
				test: /\.svg$/,
				use: [
					{
						loader: 'svg-url-loader',
						options: {
							limit: 10000
						}
					}
				]
			}
		]
	},
	devServer: {
		historyApiFallback: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new webpack.DefinePlugin({
			'process.env': {
				API_URL: JSON.stringify(process.env.API_URL)
			}
		})
	],
	resolve: {
		extensions: ['.js', '.jsx', '.scss']
	}
};
