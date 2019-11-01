const webpack = require( 'webpack' );
const NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
	mode: NODE_ENV,
	entry: {
		build: './src/index.js',
		animate: './src/frontend.js'
	},
	output: {
		path: __dirname,
		filename: './build/[name].js',
		chunkFilename: './build/[name].js'
	},
	module: {
		rules: [
			{
				test: /.js?$/,
				use: [ {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ],
						plugins: [
							'@babel/plugin-transform-async-to-generator',
							'@babel/plugin-proposal-object-rest-spread',
							[
								'@babel/plugin-transform-react-jsx', {
									'pragma': 'wp.element.createElement'
								}
							]
						]
					}
				},
				'eslint-loader' ],
				exclude: /node_modules/
			}
		]
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				animate: {
					name: 'animate',
					test: /frontend\.js$/,
					chunks: 'all',
					reuseExistingChunk: true
				}
			}
		}
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify( NODE_ENV )
		})
	]
};
