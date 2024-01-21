import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/routes/PrivateRoute";
import PublicRoute from "./components/routes/PublicRoute";
import Latestjobs from "./pages/Latestjobs";
import Profile from "./pages/Profile";
import Updateuser from "./pages/Updateuser";

function App() {
  return (
    <>
      {" "}
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            // <PublicRoute>
              <HomePage />
            // </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            // <PublicRoute>
              <Login />
            // </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            // <PublicRoute>
              <Register />
            // </PublicRoute>
          }
        />
        <Route
          path="/jobs"
          element={
            // <PublicRoute>
              <Latestjobs />
            // </PublicRoute>
          }
        />
        <Route
          path="/updateUser"
          element={
            // <PublicRoute>
              <Updateuser />
            // </PublicRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;