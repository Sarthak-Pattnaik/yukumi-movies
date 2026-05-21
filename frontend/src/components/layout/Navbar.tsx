import {
  Link
} from "react-router-dom";

const Navbar = () => {

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

        </nav>

      </div>

    </header>
  );
};

export default Navbar;