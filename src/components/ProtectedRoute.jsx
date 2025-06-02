import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const location = useLocation();

  // If there's no token and trying to access protected routes, redirect to login
  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace />;
  }

  // If there's a token and trying to access auth routes (login/register), redirect to home
  if (
    token &&
    (location.pathname === "/login" || location.pathname === "/register")
  ) {
    return <Navigate to="/playgrounds-owners" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
