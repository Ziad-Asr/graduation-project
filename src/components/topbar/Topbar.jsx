import { IoMdHelpBuoy } from "react-icons/io";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import "./Topbar.css";

const Topbar = () => {
  const menuRef = useRef(null);
  const toggleCheckboxRef = useRef(null);
  const location = useLocation();

  const routeNames = {
    "/users": "Dashboard / Users",
    "/playgrounds": "Dashboard / Playgrounds",
    "/employees": "Dashboard / Employees",
    "/playgrounds-owners": "Dashboard / Playgrounds Owners",
  };
  const sectionName = routeNames[location.pathname] || "Dashboard";

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        toggleCheckboxRef.current &&
        !toggleCheckboxRef.current.contains(event.target)
      ) {
        toggleCheckboxRef.current.checked = false;
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="topbar">
      <div className="section-name">{sectionName}</div>

      <div className="section-icons">
        <div className="links">
          <input
            type="checkbox"
            id="toggle1"
            className="toggle-hidden"
            ref={toggleCheckboxRef}
          />
          <div className="parent-div">
            <label htmlFor="toggle1" className="toggle-label">
              <div className="icons">
                <div className="help">
                  <span>Help</span>
                  <div className="help-icon">
                    <IoMdHelpBuoy />
                  </div>
                </div>
              </div>
            </label>
            <ul ref={menuRef} className="dropdown-menu">
              <li>
                <span className="topbar-link">Services</span>
              </li>
              <li>
                <span className="topbar-link">Portfolio</span>
              </li>
              <li>
                <span className="topbar-link">About</span>
              </li>
              <li>
                <span className="topbar-link">Contact</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
