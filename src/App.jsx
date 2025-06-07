import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import EditFacility from "./pages/FacilitiesModule/EditFacility/EditFacility";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Users from "./pages/Users";
import PlaygroundsOwners from "./pages/PlaygroundOwners";
import Facilities from "./pages/FacilitiesModule/Facilities/Facilities";
import AddFacility from "./pages/FacilitiesModule/AddFacility/AddFacility";
import Courts from "./pages/CourtsModule/Courts/Courts";
import AddCourt from "./pages/CourtsModule/AddCourt/AddCourt";
import EditCourt from "./pages/CourtsModule/EditCourt/EditCourt";
import Sports from "./pages/SportsModule/Sports/Sports";
import AddSport from "./pages/SportsModule/AddSport/AddSport";
import EditSport from "./pages/SportsModule/EditSport/EditSport";
// import Employees from "./pages/Employees";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";

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
            <Route
              path="/courts/add"
              element={
                <ProtectedRoute>
                  <AddCourt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/courts/edit/:id"
              element={
                <ProtectedRoute>
                  <EditCourt />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sports"
              element={
                <ProtectedRoute>
                  <Sports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sports/add"
              element={
                <ProtectedRoute>
                  <AddSport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/sports/edit/:id"
              element={
                <ProtectedRoute>
                  <EditSport />
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
