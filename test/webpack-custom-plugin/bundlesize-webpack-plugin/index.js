module.exports = class BundlesizeWebpackPlugin {
	constructor(options) {
		this.options = options || {
			sizeLimit: 3
		}
	}
	apply(compiler) {
		console.log("FROM BUNDLESIZE PLUGIN")
		compiler.hooks.done.tap("BundleSizePlugin", (stats) => {
			const {
			   path,
			   filename,
			   ...others
			} = stats.compilation.options.output;

			// console.log(filename)
			// console.log(compiler.hooks)
		  })
	}
}
