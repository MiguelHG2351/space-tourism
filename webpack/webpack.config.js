const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { commonPath } = require("./shared");
const getRoutes = require("../utils/react-utils/getRoutes");

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	mode: process.env.NODE_ENV,
	entry: {
		...getRoutes(),
		// index: path.join(commonPath.entryApp, "src", "index.client.js"),
		// __what: 'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false&live-reload=true'
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
							// plugins: [require.resolve("react-refresh/babel")].filter(Boolean),
						},
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
	watch: true,
	watchOptions: {
		ignored: ['**/server.js', 'dist/**', './index.js', '**/node_modules'],
	},
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
		{
			apply: (compiler) => {
				compiler.hooks.beforeCompile.tapAsync("beforeEmitPlugin", (params, callback) => {
					console.log("The build is starting a new compilation...");
					callback();
				});
			}
		},
		{
			apply: (compiler) => {
				compiler.hooks.entryOption.tap('MyPlugin', (context, entry) => {
					console.log('The webpack build process is starting!!!');
				});
			}
		}
	],
};
