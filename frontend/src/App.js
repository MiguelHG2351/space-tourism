import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes\
import Home from "~/routes/Home";
import Destination from "~/routes/Destination";
import Layout from "~/components/Layout";

function App(props) {

	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />}></Route>
					<Route path="destination" element={<Destination />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;

// {/* <Routes>
// 	<Route path="/" element={<Dashboard />}>
// 		<Route path="messages" element={<DashboardMessages />} />
// 		<Route path="tasks" element={<DashboardTasks />} />
// 	</Route>
// 	<Route path="about" element={<AboutPage />} />
// </Routes>; */}
