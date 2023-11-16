import { React, useState, useEffect } from 'react';
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
  const [loggedIn, setLoggedIn] = useState(false);

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

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Navbar mode={mode} toggle={toggle} loggedIn={loggedIn} />
      <div className="main">
        <Routes>
          <Route path="/" element={<Home mode={mode} loggedIn={loggedIn} />} />
          <Route path="/messages" element={<Chat mode={mode} loggedIn={loggedIn} />} />
          <Route path="/notifications" element={<Notifications loggedIn={loggedIn} />} />
          <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
          <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
