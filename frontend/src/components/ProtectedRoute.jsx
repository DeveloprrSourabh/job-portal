import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProtectedRoute = ({ children, role }) => {
  const { isLoggedIn, user } = useContext(AuthContext);
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  if (role && user?.role !== role) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
