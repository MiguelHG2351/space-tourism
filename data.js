import Home from "./frontend/src/routes/Home";
import Destination from "./frontend/src/routes/Destination";
import Layout from "./frontend/src/components/Layout";

const serverRoutes = () => {
	return [
		{
			component: Layout,
			routes: [
				{
					path: "/",
					exact: true,
					component: Home,
				},
				{
					path: "/destination",
					exact: true,
					component: Destination,
				},
			],
		},
	];
};

export default serverRoutes;
