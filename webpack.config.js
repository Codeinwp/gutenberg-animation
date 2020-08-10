const webpack = require( 'webpack' );
const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require( 'path' );
const ExtractCssChunks = require( 'extract-css-chunks-webpack-plugin' );
const ExtraneousFileCleanupPlugin = require( 'webpack-extraneous-file-cleanup-plugin' );
const { CleanWebpackPlugin } = require( 'clean-webpack-plugin' );

module.exports = {
	mode: NODE_ENV,
	entry: {
		build: './src/index.js',
		animate: './src/frontend.js'
	},
	externals: {
		'react': 'React',
		'react-dom': 'ReactDOM',
		'lodash': 'lodash'
	},
	output: {
		path: path.resolve( __dirname, 'build' ),
		filename: '[name].js',
		chunkFilename: '[name].js'
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
			},
			{
				test: /\.scss$/,
				use: [ {
					loader: ExtractCssChunks.loader
				},
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						plugins: [
							require( 'autoprefixer' )
						]
					}
				},
				'sass-loader' ]
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
		}),
		new ExtractCssChunks({
			filename: 'editor.css'
		}),
		new CleanWebpackPlugin()
	]
};
