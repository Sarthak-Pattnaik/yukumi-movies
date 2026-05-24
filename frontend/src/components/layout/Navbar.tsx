import {
  Link
} from "react-router-dom";

import { useAuthStore } from "../../store/authStore";
import api from "../../services/api";

const Navbar = () => {

  const {

    isAuthenticated,

    logout,

  } = useAuthStore();

  const handleLogout =
    async () => {

      try {

        await api.post(
          "/auth/logout"
        );

      } catch (error) {

        console.log(error);
      }

      logout();

      window.location.href =
        "/login";
    };

  return (

    <header
      className="sticky top-0 z-50 border-b border-zinc-800/60 bg-black/70 backdrop-blur-xl"
    >

      <div
        className="page-container flex h-16 items-center justify-between"
      >

        <Link
          to="/"
          className="text-2xl font-bold tracking-tight"
        >

          Yukumi
          <span
            className="text-emerald"
          >
            Movies
          </span>

        </Link>

        <nav
          className="flex items-center gap-6 text-sm font-medium text-zinc-300"
        >

          {isAuthenticated ? (

            <>
              <Link
                to="/search"
                className="transition-colors hover:text-white"
              >
                Search
              </Link>
              <Link
                to="/community"

                className="transition-colors hover:text-white"
              >

                Community

              </Link>

              <Link
                to="/profile"

                className="transition-colors hover:text-white"
              >

                Profile

              </Link>

              <Link
                to="/notifications"

                className="transition-colors hover:text-white"
              >

                Notifications

              </Link>

              <button

                onClick={handleLogout}

                className="transition-colors hover:text-white"
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <Link
                to="/login"

                className="transition-colors hover:text-white"
              >

                Login

              </Link>

              <Link
                to="/register"

                className="rounded-xl bg-[#10b981] px-5 py-2 font-semibold text-black transition-all duration-300 hover:scale-[1.03]"
              >

                Register

              </Link>

            </>

          )}

        </nav>

      </div>

    </header>
  );
};

export default Navbar;