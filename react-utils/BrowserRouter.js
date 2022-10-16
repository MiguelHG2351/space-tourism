import * as React from "react";

import { parsePath } from "./history";

export default function BrowserRouter({
	basename,
	children,
	location: locationProp = "/",
}) {
	if (typeof locationProp === "string") {
		locationProp = parsePath(locationProp);
	}

	let action = "POP";
	let location = {
		pathname: locationProp.pathname || "/",
		search: locationProp.search || "",
		hash: locationProp.hash || "",
		state: locationProp.state || null,
		key: locationProp.key || "default",
	};

	let staticNavigator = getStatelessNavigator();
	return (
		<Router
			basename={basename}
			children={children}
			location={location}
			navigationType={action}
			navigator={staticNavigator}
			static={true}
		/>
	);
}

function getStatelessNavigator() {
	return {
		createHref(to) {
			return typeof to === "string" ? to : createPath(to);
		},
		push(to) {
			throw new Error(
				`You cannot use navigator.push() on the server because it is a stateless ` +
					`environment. This error was probably triggered when you did a ` +
					`\`navigate(${JSON.stringify(to)})\` somewhere in your app.`
			);
		},
		replace(to) {
			throw new Error(
				`You cannot use navigator.replace() on the server because it is a stateless ` +
					`environment. This error was probably triggered when you did a ` +
					`\`navigate(${JSON.stringify(to)}, { replace: true })\` somewhere ` +
					`in your app.`
			);
		},
		go(delta) {
			throw new Error(
				`You cannot use navigator.go() on the server because it is a stateless ` +
					`environment. This error was probably triggered when you did a ` +
					`\`navigate(${delta})\` somewhere in your app.`
			);
		},
		back() {
			throw new Error(
				`You cannot use navigator.back() on the server because it is a stateless ` +
					`environment.`
			);
		},
		forward() {
			throw new Error(
				`You cannot use navigator.forward() on the server because it is a stateless ` +
					`environment.`
			);
		},
	};
}

export function useInRouterContext() {
	return React.useContext(LocationContext) != null;
}
