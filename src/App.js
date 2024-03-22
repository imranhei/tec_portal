import { Routes, Route, useNavigate } from "react-router-dom";
import Jobs from "./Jobs";
import Projects from "./Projects";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import User from "./components/User";
import Sidebar from "./components/Sidebar";
import View from "./components/View";
import CurrentJobs from "./components/CurrentJobs";
import History from "./components/History";
import Employee from "./components/Employee";
import { useSelector } from "react-redux";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import PrivateUserRoute from "./components/PrivateUserRoute";

function App() {
  const navigate = useNavigate();
  const login = useSelector((state) => state.userData.loggedIn)

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login]);

  return (
    <div className="flex">
      {login && (
        <div className={`fixed h-screen overflow-y-auto z-20 w-48`}>
          {/* Render Sidebar only if logged in */}
          <Sidebar />
        </div>
      )}
      <div
        className={`flex-1 overflow-auto ${
          login ? "ml-48" : "ml-0"
        } p-4 bg-slate-100 min-h-screen`}
      >
        {/* Render different components based on user role */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateAdminRoute />}>
          {/* Only admins are allowed to view this routes */}
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Projects />} />
            <Route path="/employee" element={<Employee />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/view" element={<View />} />
          </Route>
          <Route element={<PrivateUserRoute />}>
          {/* Only users are allowed to view this routes */}
            <Route path="/current-jobs" element={<CurrentJobs />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
