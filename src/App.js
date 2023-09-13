import React, { useState } from "react";
import About from "./components/About";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NoteState from "./context/NoteState";
import backgroundImage from "./background.webp";
import Alerts from "./components/Alert";
import MessageDialog from './components/Dialog';
import Login from './components/Login';
import Signup from './components/Signup'
import Profile from "./components/Profile";

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type,
    });

    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    minHeight: "100vh", 
    minWidth: "90vw",
  };

  const shouldRenderNavbar = !["/login", "/signup"].includes(window.location.pathname);
  return (
    <NoteState>
      <BrowserRouter>
        <div style={backgroundStyle}>
        {shouldRenderNavbar && <Navbar />}
          <Alerts alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home newAlert={showAlert}/>}></Route>
            <Route exact path="/about" element={<About />}></Route>
            <Route exact path="/profile" element={<Profile />}></Route>
            <Route exact path="/login" element={<Login newAlert={showAlert} />}></Route>
            <Route exact path="/signup" element={<Signup newAlert={showAlert} />}></Route>
          </Routes>
          <MessageDialog newAlert={showAlert}/>
        </div>
      </BrowserRouter>
    </NoteState>
  );
}

export default App;

