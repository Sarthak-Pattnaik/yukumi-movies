import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import { useEffect } from "react";

import {  useAuthStore } from "./store/authStore";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import UserProfile from "./pages/UserProfile";
import Notifications from "./pages/Notifications";
import ProtectedRoute from "./routes/ProtectedRoute";
import Community from "./pages/Community";

function App() {

  const checkAuth =
  useAuthStore(
    (state) =>
      state.checkAuth
  );

const loading =
  useAuthStore(
    (state) =>
      state.loading
  );

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) {

  return (

    <div
      className="flex min-h-screen items-center justify-center bg-[#0f0f0f] text-zinc-500"
    >

      Loading...

    </div>

  );
}

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={<Search />}
        />

        <Route
          path="/movies/:id"
          element={<MovieDetails />}
        />

        <Route
          path="/users/:id"
          element={<UserProfile />}
        />

        <Route
          path="/community"
          element={<Community />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;