import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import GestionNutricionista from "./components/pages/GestionNutricionista";
import ReporteCobro from "./components/pages/ReporteCobro";
import Registrarse from "./components/pages/Registrarse";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registrarse" element={<Registrarse />} />
          <Route path="/GestionNutricionista" element={<GestionNutricionista />} />
          <Route path="/ReporteCobro" element={<ReporteCobro />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
