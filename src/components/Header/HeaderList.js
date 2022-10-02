import React from "react";

import { useLocation } from "react-router-dom";
import ListItem from "./ListItem";

const routeBreadcrumb = {
	"/": "Home",
	"/destination": "Destination",
	"/crew": "Crew",
	"/Technology": "Technology"
};

function getRoutes(breadcrumbList, currentLocation) {
	return breadcrumbList.map((data, index) => {
		return { num: `${index}`.padStart(2, "0"), title: data[1], url: data[0], isSelected: data[0] === currentLocation };
	});
}

export default function HeaderList() {
	const location = useLocation();

	return (
		<ul className="header-list-menu">
			{getRoutes(Object.entries(routeBreadcrumb), location.pathname).map(
				data => (
					<ListItem
						key={data.title}
						number={data.num}
						title={data.title}
						url={data.url}
						isSelected={data.isSelected}
					/>
				)
			)}
		</ul>
	);
}
