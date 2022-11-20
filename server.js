import { Transform } from 'stream'
import express from "express";
import cors from "cors";
// import {  } from '@hapi/boom'

import * as React from "react";
import { renderToPipeableStream } from "react-dom/server";
import Layout from "./frontend/src/components/Layout";
// import { head } from '~/routes/home';

import { defaultHead } from './utils/constants'

const app = express();

app.use(cors());

app.use("/public", express.static("build/public"));

if(process.env.NODE_ENV === 'development') {
	let webpack = require('webpack');
	let webpackConfig = require('./webpack/webpack.config');
	let compiler = webpack(webpackConfig);

	app.use(require("webpack-dev-middleware")(compiler, {
		writeToDisk: true,
		serverSideRender: true,
		publicPath: webpackConfig.output.publicPath,
	}));
	app.use(require("webpack-hot-middleware")(compiler, {
		path: "/__what",
		heartbeat: 2000
	}));
}

app.get('/api/data', (req, res) => {
	console.log(req.url.slice(1))

	res.json({
		xd: 'xd'
	})
})

async function getComponent(componentPath) {
	const { default: Component, ...props } = await import(componentPath);
	return { Component, props };
}

app.get("*", async (req, res, next) => {
	// const headObj = await import(`./frontend/src/routes${req.path}.js`);
	let head;
	const ignoreExtension = ['json', 'js', '__what', 'css', 'ico', 'jpg', 'jpeg', 'png']
	if (req.url.includes('/public') || req.url.includes('/pages')) {
		return next();
	}
	// if some extension is in the url, ignore it
	if (ignoreExtension.some(ext => req.url.includes(ext))) {
		return next();
	}
	console.log('come here')
	console.log(req.url)
	try {
		const currentPage = req.url.slice(1) === '' ? 'home' : req.url.slice(1);
		const componentPath = `./frontend/src/routes/${currentPage}`
		const { Component, props } = await getComponent(componentPath);

		if(!(typeof props === 'undefined')) {
			head = {...defaultHead}
			head.title = 'Space Tourism'
		}
		if(typeof props === 'object') {
			for(const key in defaultHead) {
				head[key] = props[key] || defaultHead[key]
			}
		}
		
		const Page = <html>
			<head>
				<meta charSet='utf-8' />
				<title>{ head.title }</title>
				<link rel="stylesheet" href={`/public/pages/${currentPage}/styles.css`} />
				<link rel="favicon" href="https://miguel2351.me/images/favicon.ico" />
			</head>
			<body>
				<div id="root">
					<Layout>
						<Component />
					</Layout>
				</div>
				<script type="text/javascript" src="/public/pages/assets/common.js"></script>
				<script type="text/javascript" src="/public/pages/assets/vendor.js"></script>
				<script type="text/javascript" src={ `/public/pages/frontend_src_components_Layout_js/index.js` }></script>
				<script type="text/javascript" src={ `/public/pages/${currentPage}/index.js` }></script>
			</body>
		</html>
		const readStream = new Transform({
			transform(chunk, encoding, callback) {
				console.log(chunk.toString())
				this.push(chunk.toString())
				callback()
			}
		})
		const html =
			renderToPipeableStream(
				Page,
				{
					onShellReady() {
						res.statusCode = 200
						res.setHeader('Content-Type', 'text/html')
						html.pipe(readStream).pipe(res)
						console.log('D:')
					},
					onAllReady() {
						console.log(':D')
					},
					// bootstrapScripts: ['/public/pages/home/index.js', '/public/pages/assets/common.js', '/public/pages/assets/vendor.js'],
				}
			)
	} catch (err) {
		console.log(err)
		console.log('dasdassadsad')
	}
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

export default app;
