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
import { useSelector } from "react-redux";

function App() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.userData.loggedIn);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    setLogin(user);
  }, [user]);

  useEffect(() => {
    if (!login) {
      navigate("/login");
    }
  }, [login]);

  return (
    <div className="flex">
      {login && (
        <div className={`fixed h-screen overflow-y-auto z-20 w-48`}>
          <Sidebar />
        </div>
      )}
      <div className={`flex-1 overflow-auto ${login ? 'ml-48' : 'ml-0'} p-4 bg-slate-100 min-h-screen`}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/" element={<Projects />} />
          <Route path="/register" element={<Register />} />
          <Route path="/user" element={<User />} />
          <Route path="/projects/view" element={<View />} />
          <Route path="/current-jobs" element={<CurrentJobs />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
