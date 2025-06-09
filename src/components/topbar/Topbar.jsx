import { IoLogOut } from "react-icons/io5";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Topbar.css";

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeNames = {
    "/users": "Dashboard / Users",
    "/facilities": "Dashboard / Facilities",
    "/employees": "Dashboard / Employees",
    "/playgrounds-owners": "Dashboard / Playgrounds Owners",
    "/sports": "Dashboard / Sports",
    "/courts": "Dashboard / Courts",
  };
  const sectionName = routeNames[location.pathname] || "Dashboard";

  const handleLogout = () => {
    // Clear localStorage
    localStorage.clear();

    // Clear cookies
    document.cookie.split(";").forEach((c) => {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });

    toast.success("Logged out successfully!");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="section-name">{sectionName}</div>

      <div className="section-icons">
        <div className="links">
          <button onClick={handleLogout} className="logout-button">
            <div className="logout-icon">
              <IoLogOut />
            </div>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
