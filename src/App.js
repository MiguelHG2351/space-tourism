import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes
import Home from "./routes/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
