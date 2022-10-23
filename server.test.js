import express from "express";
import cors from "cors";

import * as React from "react";
import { renderToPipeableStream } from 'react-dom/server';
// import { renderFullPage } from "./react-utils/react-express";

const app = express();

app.use(cors());

app.use("/public", express.static("build/"));

app.get("/xd", (req, res) => {
	console.log(req.url.slice(1));

	res.json({
		xd: "xd",
	});
});

app.get("*", async (req, res, next) => {
	// const headObj = await import(`./frontend/src/routes${req.path}.js`);
	if(req.url.includes('/public')) {
		next();
	}

	try {
        let didError = false;
		let body = '';
		const Component = (
		<header>
			<h1>Aguacate</h1>
		</header>
		)
		
		let element = renderToPipeableStream(Component, {
			onShellReady() {
				res.statusCode = 200
				res.setHeader('Content-Type', 'text/html')
				element.pipe(res)
			},
			bootstrapScriptContent: `window.__INITIAL_DATA__ = ${JSON.stringify({})}`,
			bootstrapModules: ['scripttt', 'scripttt'],
			bootstrapScripts: ['scripttt2', 'scripttt2'],
			
		});

		console.log(element);

		// res.send('<!DOCTYPE html>');
	} catch (err) {
		console.log(err);
		console.log("dasdassadsad");
	}
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

export default app;
