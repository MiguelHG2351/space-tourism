const { resolve } = require("path")
const bundlesizeplugin = require("./bundlesize-webpack-plugin")

/**
 * @type { import('webpack').Configuration }
 */
module.exports = {
	resolveLoader: {
		modules: [resolve(__dirname, "node_modules"), resolve(__dirname, "loaders")],
	},
	entry: resolve(__dirname, 'src/index.js'),
	module: {
		rules: [
			{
				test: /\.js$/,	
				exclude: /node_modules/,
				use: [
					{
						loader: resolve('loaders/custom.js'),
					},
					{
						loader: require.resolve("babel-loader"),
						options: {
							presets: ["@babel/preset-env"],
						},
					},
				]
			}
		]
	},
	output: {
		path: resolve(__dirname, 'bin'),
		filename: 'bundle.js'
	},
	plugins: [new bundlesizeplugin()]
}