import { Route, Routes, Navigate } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Users from "./pages/Users";
import Playgrounds from "./pages/Playgrounds";
import Employees from "./pages/Employees";
import PlaygroundsOwners from "./pages/PlaygroundOwners";
import "./app.css";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <div className="page-content">
        <Topbar />
        <div className="web-routes">
          <Routes>
            <Route path="/" element={<Navigate to="/users" />} />
            <Route path="/users" element={<Users />} />
            <Route path="/playgrounds" element={<Playgrounds />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/playgrounds-owners" element={<PlaygroundsOwners />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
