const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { commonPath } = require("./shared");
const getRoutes = require("../utils/react-utils/getRoutes");
const webpack = require("webpack");

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		// hmr_react: path.join(process.cwd(), "build", 'main.js'),
		...getRoutes(),
		// index: path.join(commonPath.entryApp, "src", "index.client.js"),
	},
	resolveLoader: {
		modules: [path.resolve(process.cwd(), "node_modules"), path.resolve(__dirname, "webpack/loaders")],
	},
	output: {
		path: commonPath.output,
		publicPath: "/",
		filename: "[name]/index.js",
		clean: true,
	},
	resolve: {
		alias: {
			'~': path.resolve(__dirname, '../frontend/src/'),

		},
		extensions: ['.js', '.css', '.json', '.wasm'],
	},
	module: {
		rules: [
			{
				test: /\.[jt]sx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: require.resolve("babel-loader"),
						options: {
							presets: ["@babel/preset-env", "@babel/preset-react"],
							plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
						},
					},
					{
						loader: path.resolve('webpack/loaders/fr-react.js'),
					},
				],
			},
			{
				test: /\.css$/i,
				exclude: /node_modules/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							url: false,
						},
					},
				],
			},
		],
	},
	// watch: true,
	// watchOptions: {
	// 	ignored: ['**/server.js', 'dist/**', './index.js', '**/node_modules'],
	// },
	optimization: {
		splitChunks: {
			chunks: "all",
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
					name: "commons",
					chunks: "all",
					filename: "assets/common.js",
					reuseExistingChunk: true,
					enforce: true,
					priority: 20,
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendors",
					chunks: "all",
					filename: "assets/vendor.js",
					reuseExistingChunk: true,
					enforce: true,
					priority: 10,
				},
			},
		},
	},
	devtool: "source-map",
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name]/styles.css",
		}),
		new CopyPlugin({
			patterns: [
				{ from: path.join(__dirname, '..', 'frontend', "public", "assets"), to: "../assets" },
			],
		}),
		new WebpackManifestPlugin({
			publicPath: "/",
		}),
		new CleanWebpackPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
		// {
			// apply: (compiler) => {
				// change file output path
				// compiler.hooks.emit.tap('ChangeOutputPath', (compilation) => {
					// console.log(Object.keys(compilation.assets));
					// compilation.chunks.forEach((chunk) => {
					// 	console.log();
					// 	chunk.files.forEach((filename) => {
					// 		if()
					// 	});
					// });
					// compilation.chunks.forEach((chunk) => {
						// chunk.files.forEach((file) => {
							// if(file === '__what/index.js') {
								// console.log(file)
								// compilation.assets[file.replace('__what/index.js', '../__what/index.js')] = compilation.assets[file];
								// delete compilation.assets[file];
				// 			}
				// 		});
				// 	});
				// });
			// },
		// }
	],
	devServer: {
		hot: true,
	},
	mode: "development",
};
