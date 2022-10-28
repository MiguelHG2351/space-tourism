import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes\
import Home from "~/routes/Home";
import Destination from "~/routes/Destination";
import Layout from "~/components/Layout";

function App() {

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