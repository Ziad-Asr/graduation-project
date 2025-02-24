import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import Users from "./pages/users/Users";
import Playgrounds from "./pages/playgrounds/Playgrounds";

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
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
