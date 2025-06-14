import { NavLink } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import { GiSoccerField } from "react-icons/gi";
import ownersSVG from "../../assets/owners.svg";
import usersSVG from "../../assets/users.svg";
import facilitiesSVG from "../../assets/facilities.svg";
import courtsSVG from "../../assets/courts.svg";
import sportsSVG from "../../assets/sports.svg";
import bookingsSVG from "../../assets/booking.svg";

import "./Sidebar.css";

const SideBar = () => {
  const role = JSON.parse(localStorage.getItem("userData"))?.role;
  const ownerName = JSON.parse(localStorage.getItem("userData"))?.name;
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  let routes;

  if (role === "Admin") {
    routes = [
      {
        path: "/playgrounds-owners",
        name: "Playgrounds Owners",
        icon: (
          <img
            src={ownersSVG}
            alt="Owners"
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
      {
        path: "/users",
        name: "Users",
        icon: (
          <img
            src={usersSVG}
            alt="Owners"
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
      {
        path: "/facilities",
        name: "Facilities",
        icon: (
          <img
            src={facilitiesSVG}
            alt="Owners"
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
      {
        path: "/courts",
        name: "Courts",
        icon: (
          <img
            src={courtsSVG}
            alt="Owners"
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
      {
        path: "/sports",
        name: "Sports",
        icon: (
          <img
            src={sportsSVG}
            alt="Owners"
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
      {
        path: "/booking",
        name: "Booking",
        icon: (
          <img
            src={bookingsSVG}
            alt="Owners"
            style={{ width: "20px", height: "20px" }}
          />
        ),
      },
    ];
  } else {
    routes = [
      {
        path: "/facilities",
        name: "Facilities",
        icon: <GiSoccerField />,
      },
      {
        path: "/courts",
        name: "Courts",
        icon: <GiSoccerField />,
      },
      {
        path: "/booking",
        name: "Booking",
        icon: <GiSoccerField />,
      },
    ];
  }

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="main-container">
      <motion.div
        animate={{
          width: isOpen ? "230px" : "45px",
          transition: {
            duration: 0.5,
            type: "spring",
            damping: 10,
          },
        }}
        className={`sidebar `}
      >
        <div className="top_section">
          <AnimatePresence>
            {isOpen && (
              <motion.h1
                variants={showAnimation}
                initial="hidden"
                animate="show"
                exit="hidden"
                className="logo"
              >
                {ownerName}
              </motion.h1>
            )}
          </AnimatePresence>
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>

        <section className="routes">
          {routes.map((route, index) => {
            if (route.subRoutes) {
              return (
                <SidebarMenu
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                  key={Math.random()}
                />
              );
            }

            return (
              <NavLink
                to={route.path}
                key={index}
                className={({ isActive }) => `link ${isActive ? "active" : ""}`}
              >
                <div className="icon">{route.icon}</div>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      variants={showAnimation}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                      className="link_text"
                    >
                      {route.name}
                    </motion.div>
                  )}
                </AnimatePresence>
              </NavLink>
            );
          })}
        </section>
      </motion.div>
    </div>
  );
};

export default SideBar;
