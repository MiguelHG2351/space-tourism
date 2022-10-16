import express from "express";
import cors from "cors";

import * as React from "react";
import { renderToString } from "react-dom/server";
import { renderFullPage } from "./react-utils/react-express";
import { StaticRouter } from "react-router-dom/server";
// import { renderRoutes } from "react-router-config";
import RenderRoutes from "./react-utils/RenderRoutes";

import App from "./frontend/src/routes/Home";
import Layout from "./frontend/src/components/Layout";
import data from "./data";

const app = express();

app.use(cors());

app.use("/public", express.static("build/public"));

app.get("*", (req, res) => {
	const _data = data()
	// const rEute = <RenderRoutes routes={_data} />
	console.log(_data)

	const html = renderFullPage(
		renderToString(
			<StaticRouter context={{}} location={req.url}>
				<RenderRoutes routes={_data} />
				{/* <App /> */}
			</StaticRouter>
		)
	);

	// console.log(html);

	res.send(html);
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

export default app;
