import express from "express";
import cors from "cors";

import * as React from "react";
import { renderToString } from "react-dom/server";
import { renderFullPage } from "./react-utils/react-express";
// import { StaticRouter } from "react-router-dom/server";
// import RenderRoutes from "./react-utils/RenderRoutes";
// import data from "./data";

const app = express();

app.use(cors());

app.use("/public", express.static("build/"));

app.get('/api/data', (req, res) => {
	console.log(req.url.slice(1))
	
	res.json({
		xd: 'xd'
	})
})

app.get("*", async (req, res, next) => {
	// const headObj = await import(`./frontend/src/routes${req.path}.js`);
	if(req.url.includes('/public') || req.url === '/favicon.ico') {
		return next();
	}
	console.log(req.url)
	try {
		const componentName = req.url.slice(1) === '' ? 'home' : req.url.slice(1);
		const componentPath = `./frontend/src/routes/${componentName}`
		console.log(componentPath)
		const { head, default: Component } = await import(componentPath);
		// const _data = data()
	
		const html = renderFullPage(
			renderToString(
				<Component />
			),
			head
		);
	
		// console.log(html);
	
		res.send(html);
	} catch(err) {
		console.log(err)
		console.log('dasdassadsad')
	}
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

export default app;
