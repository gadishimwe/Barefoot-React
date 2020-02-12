const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'index_bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s(a|c)ss$/,
				exclude: /\.module.(s(a|c)ss)$/,
				use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
			},
			{
				test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
				use: {
					loader: 'url-loader?limit=5000',
				},
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ['file-loader'],
			},
			{ test: /\.jsx?$/, loader: 'babel-loader' },
		],
	},
	devServer: {
		historyApiFallback: true,
	},
	plugins: [
		new Dotenv(),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
	resolve: {
		extensions: ['.js', '.jsx', '.scss'],
	},
};
