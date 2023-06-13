import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Cadastro from "./pages/Cadastro/Cadastro";
import Login from "./pages/Login/Login";
import ParticipantePage from "./pages/ParticipantePage/ParticipantePage";
import Header from "./components/Header/Header";
import { LoginContextProvider } from "./context/LoginContext";
import Admin from "./pages/Admin/Admin";

function App() {
  return (
    <LoginContextProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Cadastro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/amigo-secreto/:id" element={<ParticipantePage />} />
          <Route path="/dashboard/:admin" element={<Admin />} />
          <Route path="*" element={<h1>NOT FOUND</h1>} />
        </Routes>
      </Router>
    </LoginContextProvider>
  );
}

export default App;
