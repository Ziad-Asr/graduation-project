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
import ProtectedRoute from "./components/ProtectedRoute";
import AddFacility from "./pages/AddFacility";
import EditFacility from "./pages/EditFacility";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
            <Route
              path="/login"
              element={
                <ProtectedRoute>
                  <Login />
                </ProtectedRoute>
              }
            />
            <Route
              path="/register"
              element={
                <ProtectedRoute>
                  <Register />
                </ProtectedRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/playgrounds-owners" />
                </ProtectedRoute>
              }
            />
            <Route
              path="/users"
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              }
            />
            <Route
              path="/facilities"
              element={
                <ProtectedRoute>
                  <Facilities />
                </ProtectedRoute>
              }
            />
            <Route
              path="/facilities/add"
              element={
                <ProtectedRoute>
                  <AddFacility />
                </ProtectedRoute>
              }
            />
            <Route
              path="/facilities/edit/:id"
              element={
                <ProtectedRoute>
                  <EditFacility />
                </ProtectedRoute>
              }
            />
            {/* <Route path="/employees" element={<Employees />} /> */}
            <Route
              path="/playgrounds-owners"
              element={
                <ProtectedRoute>
                  <PlaygroundsOwners />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courts"
              element={
                <ProtectedRoute>
                  <Courts />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
