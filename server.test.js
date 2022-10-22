import express from "express";
import cors from "cors";

import * as React from "react";
import { renderToReadableStream } from 'react-dom/server';
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

app.get("*", async (req, res) => {
	// const headObj = await import(`./frontend/src/routes${req.path}.js`);
	try {
        let didError = false;

		let element = await renderToReadableStream(
            <html>
              <body>Success</body>
            </html>,
            {
              onError(error) {
                didError = true;
                console.error(error);
              }
            }
          );
		// <RenderRoutes routes={_data} />
		// <Component />

		console.log(element);

		res.send('<!DOCTYPE html>');
	} catch (err) {
		console.log(err);
		console.log("dasdassadsad");
	}
});

app.listen(3000, () => {
	console.log("Server listening on port 3000");
});

export default app;
