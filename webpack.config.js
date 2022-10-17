const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { commonPath } = require("./webpack/common");
const getRoutes = require("./react-utils/getRoutes");

module.exports = {
	entry: {
		// main: path.join(commonPath.entryApp, "src", "index.js"),
		...getRoutes(),
		indexjs: path.join(commonPath.entryApp, "src", "index.js"),
		// __what: 'webpack-hot-middleware/client?path=/__what&timeout=2000&overlay=false&live-reload=true'
	},
	output: {
		path: commonPath.output,
		publicPath: "/",
		filename: "[name].js",
		clean: true,
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
							// modules: {
							// 	mode: "local",
							// 	localIdentName: "[path][name]__[local]--[hash:base64:5]",
							// },
						},
					},
				],
				// options: {
				// },
			},
		],
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
				// styles: {
				// 	name: "styles",
				// 	type: "css/mini-extract",
				// 	chunks: "all",
				// 	enforce: true,
				// },
			},
		},
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: "[name].css",
		}),
		new CopyPlugin({
			patterns: [
				{ from: path.join(commonPath.entryApp, "public", "assets"), to: "assets" },
			],
		}),
		new WebpackManifestPlugin(),
	],
};
