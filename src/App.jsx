import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Users from "./pages/Users";
import Facilities from "./pages/Facilities";
// import Employees from "./pages/Employees";
import PlaygroundsOwners from "./pages/PlaygroundOwners";
import Login from "./pages/login/Login";
import "./app.css";
import Register from "./pages/register/Register";
import Courts from "./pages/Courts";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  return (
    <div className="app">
      {!isAuthPage && <Sidebar />}
      <div className="page-content">
        {!isAuthPage && <Topbar />}
        <div className="web-routes">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/users" element={<Users />} />
            <Route path="/facilities" element={<Facilities />} />
            {/* <Route path="/employees" element={<Employees />} /> */}
            <Route path="/playgrounds-owners" element={<PlaygroundsOwners />} />
            <Route path="/courts" element={<Courts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
