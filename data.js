import React from "react";
import Home from "./frontend/src/routes/home";
import Destination from "./frontend/src/routes/destination";
import Layout from "./frontend/src/components/Layout";

const serverRoutes = () => {
	return [
		{
            path: "/",
			Component: <Layout />,
			routes: [
				{
					path: "/",
					index: true,
					Component: <Home />,
				},
				{
					path: "destination",
					index: false,
					Component: <Destination />,
				},
			],
		},
	];
};

export default serverRoutes;
