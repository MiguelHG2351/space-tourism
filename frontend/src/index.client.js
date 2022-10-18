import React from "react";
import ReactDOM from "react-dom/client";
// import reportWebVitals from "./reportWebVitals";

import Layout from "./components/Layout";

ReactDOM.hydrateRoot(
	document.getElementById("root"),
	// <React.StrictMode>
    <Layout>
        <App />
    </Layout>
	// </React.StrictMode>
);

// reportWebVitals();
