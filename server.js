import express from "express";
import cors from "cors";

import * as React from "react";
import { renderToString } from "react-dom/server";
import { renderFullPage } from "./react-utils/react-express";
import { StaticRouter } from "react-router-dom/server";
import RenderRoutes from "./react-utils/RenderRoutes";
import data from "./data";

const app = express();

app.use(cors());

app.use("/public", express.static("build/public"));

app.get("*", async (req, res) => {
	// const headObj = await import(`./frontend/src/routes${req.path}.js`);
	const { head } = await import(`./frontend/src/routes/Home`);
	const _data = data()

	const html = renderFullPage(
		renderToString(
			<RenderRoutes routes={_data} />
		),
		head
	);

	// console.log(html);

	res.send(html);
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

export default app;
