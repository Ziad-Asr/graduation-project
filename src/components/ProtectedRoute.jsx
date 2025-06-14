import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("userToken");
  const location = useLocation();

  if (
    !token &&
    location.pathname !== "/login" &&
    location.pathname !== "/register"
  ) {
    return <Navigate to="/login" replace />;
  }

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
