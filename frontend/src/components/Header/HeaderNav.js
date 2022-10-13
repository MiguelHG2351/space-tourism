import React, { useState, useEffect } from "react";
import HeaderList from "./HeaderList";

const classOption = {
	default: "header-menu",
	active: "header-menu active",
	inactive: "header-menu inactive"
};

function changeClassMenu(classStr) {
	const classList = classStr.split(" ");
	return classList[1] === "active"
		? classOption.inactive
		: classOption.active;
}

export default function HeaderNav() {
	const [menu, setMenu] = useState("header-menu");

	useEffect(() => {
		const mql = window.matchMedia("(min-width: 768px)");
		mql.addEventListener("change", e => {
			if (e.matches) {
				setMenu(classOption.default);
			} else {
				setMenu(classOption.inactive);
			}
		});

		return () => {
			mql.removeEventListener("change", () => {
				console.log("removed");
			});
		};
	}, []);

	function mobileHandler() {
		const newClass = changeClassMenu(menu);

		setMenu(newClass);
	}

	return (
		<>
			<div className="mobile-menu-btn">
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
			</div>
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
					<HeaderList />
				</nav>
			</div>
		</>
	);
}
