import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Jobs from "./pages/Job";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import CreateJob from "./pages/CreateJob";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        {/* User Routes */}
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
        {/* Job ROutes */}
        <Route
          path="/jobs"
          element={
            <ProtectedRoute>
              <Jobs />
            </ProtectedRoute>
          }
        />
        {/* Recruiter Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="recruiter">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* Create Job */}
        <Route
          path="/dashboard/create-job"
          element={
            <ProtectedRoute role="recruiter">
              <CreateJob />
            </ProtectedRoute>
          }
        />
        {/* Recruiter Dashboard */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
