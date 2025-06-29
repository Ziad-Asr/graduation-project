import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Topbar from "./components/topbar/Topbar";
import Sidebar from "./components/sidebar/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";
import EditFacility from "./pages/FacilitiesModule/EditFacility/EditFacility";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Users from "./pages/Users/Users";
import PlaygroundsOwners from "./pages/PlaygroundOwners/PlaygroundOwners";
import Facilities from "./pages/FacilitiesModule/Facilities/Facilities";
import AddFacility from "./pages/FacilitiesModule/AddFacility/AddFacility";
import Courts from "./pages/CourtsModule/Courts/Courts";
import AddCourt from "./pages/CourtsModule/AddCourt/AddCourt";
import EditCourt from "./pages/CourtsModule/EditCourt/EditCourt";
import Sports from "./pages/SportsModule/Sports/Sports";
import AddSport from "./pages/SportsModule/AddSport/AddSport";
import EditSport from "./pages/SportsModule/EditSport/EditSport";
import NotFound from "./pages/NotFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import Booking from "./pages/BookingModule/Booking/Booking";

function App() {
  const location = useLocation();
  const isAuthPage =
    location.pathname.startsWith("/login") ||
    location.pathname.startsWith("/register");

  const role = JSON.parse(localStorage.getItem("userData"))?.role;

  const isNotFoundPage = ![
    "/",
    role === "Admin" && "/users",
    "/facilities",
    role === "Admin" && "/playgrounds-owners",
    "/courts",
    role === "Admin" && "/sports",
    "/booking",
  ].some(
    (route) =>
      location.pathname === route || location.pathname.startsWith(route + "/")
  );

  return (
    <div className="app">
      {!isAuthPage && !isNotFoundPage && <Sidebar />}
      <div className="page-content">
        {!isAuthPage && !isNotFoundPage && <Topbar />}
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

            {role === "Admin" && (
              <Route
                path="/users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
              />
            )}

            <Route
              path="/facilities"
              element={
                <ProtectedRoute>
                  <Facilities />
                </ProtectedRoute>
              }
            />
            {role === "Owner" && (
              <Route
                path="/facilities/add"
                element={
                  <ProtectedRoute>
                    <AddFacility />
                  </ProtectedRoute>
                }
              />
            )}

            {role === "Owner" && (
              <Route
                path="/facilities/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditFacility />
                  </ProtectedRoute>
                }
              />
            )}

            {role === "Admin" && (
              <Route
                path="/playgrounds-owners"
                element={
                  <ProtectedRoute>
                    <PlaygroundsOwners />
                  </ProtectedRoute>
                }
              />
            )}

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

            {role === "Admin" && (
              <Route
                path="/sports"
                element={
                  <ProtectedRoute>
                    <Sports />
                  </ProtectedRoute>
                }
              />
            )}

            {role === "Admin" && (
              <Route
                path="/sports/add"
                element={
                  <ProtectedRoute>
                    <AddSport />
                  </ProtectedRoute>
                }
              />
            )}

            {role === "Admin" && (
              <Route
                path="/sports/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditSport />
                  </ProtectedRoute>
                }
              />
            )}

            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
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
