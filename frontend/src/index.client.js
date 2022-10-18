import React from "react";
import ReactDOM from "react-dom/client";

//app_ref

import Layout from "./components/Layout";

const rootEl = document.getElementById("root")

if(rootEl.innerHTML === "") {
    ReactDOM.hydrateRoot(
        rootEl,
        // <React.StrictMode>
        <Layout>
            <App />
        </Layout>
        // </React.StrictMode>
    );
} else {
    ReactDOM.render(
        // <React.StrictMode>
        <Layout>
            <App />
        </Layout>
        // </React.StrictMode>,
        ,
        document.getElementById("root")
    );
}

// reportWebVitals();
