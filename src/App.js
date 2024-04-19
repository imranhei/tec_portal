import { Routes, Route, useNavigate } from "react-router-dom";
import Jobs from "./Jobs";
import Projects from "./components/Projects";
import Login from "./components/Login";
import Register from "./components/Register";
import { useEffect, useState } from "react";
import User from "./components/User";
import Sidebar from "./components/Sidebar";
import View from "./components/View";
import CurrentJobs from "./components/CurrentJobs";
import History from "./components/History";
import Employee from "./components/Employee";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import PrivateUserRoute from "./components/PrivateUserRoute";
import JobSheet from "./components/JobSheet";

function App() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  function isLoggedIn() {
    const accessToken = sessionStorage.getItem("access_token");
    // Check if the access token exists and is not expired
    return accessToken !== null;
  }
  
  useEffect(() => {
    const checkLoggedIn = async () => {
      setIsLoading(true);
      if (!isLoggedIn()) {
        navigate("/login");
      }
      setIsLoading(false);
    };

    checkLoggedIn();
  }, [navigate]);

  // Render loading state if still loading
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {isLoggedIn() && (
        <div className={`fixed h-screen overflow-y-auto z-20 w-48`}>
          {/* Render Sidebar only if logged in */}
          <Sidebar />
        </div>
      )}
      <div
        className={`flex-1 overflow-auto ${
          isLoggedIn() ? "ml-48" : "ml-0"
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
            <Route path="/job-sheet" element={<JobSheet />} />
          </Route>
          <Route element={<PrivateUserRoute />}>
          {/* Only users are allowed to view this routes */}
            <Route path="/current-jobs" element={<CurrentJobs />} />
            <Route path="/jobsheet" element={<JobSheet />} />
            <Route path="/history" element={<History />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
