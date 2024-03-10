import { Routes, Route, useNavigate } from "react-router-dom";
import Jobs from "./Jobs";
import Projects from "./Projects";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import User from "./components/User";
import Sidebar from "./components/Sidebar";
import View from "./components/View";

function App() {
  const navigate = useNavigate();
  const login = true;

  useEffect(() => {
    if (!login) {
      console.log("hello");
      navigate("/login");
    }
  }, [login]);

  return (
    <div className="flex">
      <div className={`fixed h-screen overflow-y-auto z-20 w-48`}>
        <Sidebar />
      </div>
      <div className="flex-1 overflow-auto ml-48">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/" element={<Projects />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<User />} />
        <Route path="/projects/view" element={<View />} />
      </Routes>
      </div>
    </div>
  );
}

export default App;
