import { React, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages";
import Chat from "./pages/messages";
import Logout from "./pages/logout";
import Login from './pages/login';
import Notifications from './pages/notifications';

function App() {
  const [mode, setMode] = useState("light");

  const toggle = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "black";
    }
    else if (mode === "dark") {
      setMode("light");
      document.body.style.backgroundColor = "#f1f1f1";
    }
  }

  return (
    <Router>
      <Navbar title="Mobashshir" mode={mode} toggle={toggle} />
      <div className="main">
      <Routes>
        <Route path="/" element={<Home mode={mode}/>} />
        <Route path="/messages" element={<Chat mode={mode}/>} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
