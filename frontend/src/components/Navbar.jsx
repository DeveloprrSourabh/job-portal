import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const {
  isLoggedIn,
  setIsLoggedIn,
  user,
  setUser,
} = useContext(AuthContext);



  // Logout Function
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  setIsLoggedIn(false);
  setUser(null);
};
  return (
    <nav className="flex justify-between items-center px-8 py-4 border-b">
      <h1 className="text-2xl font-bold">
        JobPortal
      </h1>

      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/jobs">Jobs</Link>
        {user?.role === "recruiter" && (
  <Link to="/dashboard">Dashboard</Link>
)}
        {
          isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="text-red-500"
            >
              Logout
          </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )
        }
      </div>
    </nav>
  );
};

export default Navbar;