import { React, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages";
import Chat from "./pages/messages";
import Logout from "./pages/logout";
import Login from './pages/login';
import Games from './pages/games';
import Error from './components/Error Pages/500';

function App() {
  const [mode, setMode] = useState("light");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(false);

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
      {error === true ?
        <>
          <header>
            <Navbar mode={mode} toggle={toggle} loggedIn={loggedIn} />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Home mode={mode} loggedIn={loggedIn} error={setError} />} />
              <Route path="/messages" element={<Chat mode={mode} loggedIn={loggedIn} error={setError} />} />
              <Route path="/games" element={<Games loggedIn={loggedIn} error={setError} />} />
              <Route path="/logout" element={<Logout setLoggedIn={setLoggedIn} />} />
              <Route path="/login" element={<Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}  error={setError} />} />
            </Routes>
          </main>
          <footer>

          </footer>
        </> :
        <Error />
      }
    </Router>
  );
}

export default App;
