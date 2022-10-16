import React from "react";
import { Route, Routes } from "react-router-dom";

export default function RenderRoutes({ routes, extraProps, switchProps }) {
	console.log("aqui estan las rutas");
	// console.log(routes)
	if (extraProps === void 0) {
		extraProps = {};
	}

	if (switchProps === void 0) {
		switchProps = {};
	}

	return routes ? (
		<Routes>
			{routes.map(function (route, index) {
				return <Route path={route.path} key={index+"mainroutes"} element={route.Component}>
          {route.routes && route.routes.map(function (route, index) {
            return <Route path={route.path} key={index+"subroutes"} element={route.Component} />
          })}
        </Route>;
			})}
		</Routes>
	) : null;
}
