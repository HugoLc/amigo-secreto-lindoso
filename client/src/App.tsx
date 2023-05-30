import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import ParticipantePage from "./pages/ParticipantePage";

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/amigo-secreto/Hugo">Participante</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/amigo-secreto/:id" element={<ParticipantePage />} />
          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
