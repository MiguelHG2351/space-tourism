import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Routes
import Home from "./routes/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={ <Home /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
