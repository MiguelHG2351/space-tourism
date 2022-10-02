import { useLocation } from "react-router-dom";
import { useState } from "react";
import React from "react";

import ListItem from "./ListItem";

const classOption = {
	active: "header-menu active",
	inactive: "header-menu inactive"
};

const routeBreadcrumb = {
	"/": "Home",
	"/destination": "Destination",
	"/crew": "Crew",
	"/Technology": "Technology"
};

function getRoutes(breadcrumbList, currentLocation) {
	return breadcrumbList.map((data, index) => {
// 		console.log(
// 			`Número es ${index + 1} con el título ${data[1]} con la url ${data[0]}
//         y ${data[0] === "/" ? "este es" : "este no es"}
// `
// 		);
		return { num: `${index}`.padStart(2, "0"), title: data[1], url: data[0], isSelected: data[0] === currentLocation };
	});
}

export default function ListMenu() {
	const location = useLocation();
	const [menu, setMenu] = useState("header-menu");
	console.log(getRoutes(Object.entries(routeBreadcrumb)));

	function mobileHandler() {
		const classList = menu.split(" ");
		const newClass =
			classList[1] === "inactive" ? classOption.active : classOption.inactive;

		setMenu(newClass);
	}

	return (
		<>
			<button
				onClick={mobileHandler}
				className="btn-menu"
				aria-label="menu"
				type="button"
			>
				<svg xmlns="http://www.w3.org/2000/svg" width="24" height="21">
					<g fill="#D0D6F9" fillRule="evenodd">
						<path d="M0 0h24v3H0zM0 9h24v3H0zM0 18h24v3H0z" />
					</g>
				</svg>
			</button>
			<div className={menu}>
				<div className="header-menu-action" align="right">
					<button
						onClick={mobileHandler}
						className="btn-close"
						aria-label="menu"
						type="button"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="21">
							<g fill="#D0D6F9" fillRule="evenodd">
								<path d="M2.575.954l16.97 16.97-2.12 2.122L.455 3.076z" />
								<path d="M.454 17.925L17.424.955l2.122 2.12-16.97 16.97z" />
							</g>
						</svg>
					</button>
				</div>
				<nav className="header-list-container">
					<ul className="header-list-menu">
						{getRoutes(Object.entries(routeBreadcrumb), location.pathname).map(data => (
							<ListItem key={data.title} number={data.num} title={data.title} url={data.url} isSelected={data.isSelected} />
						))}
					</ul>
				</nav>
			</div>
		</>
	);
}
