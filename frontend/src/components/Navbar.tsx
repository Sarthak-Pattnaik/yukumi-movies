import {
  Link,
} from "react-router-dom";

import useAuthStore from "../store/authStore";

const Navbar = () => {

  const {
    isAuthenticated,
    user,
    logout,
  } = useAuthStore();

  return (

    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid gray",
      }}
    >

      <Link to="/">
        Home
      </Link>

      <Link to="/feed">
        Feed
      </Link>

      <Link to="/search">
        Search
      </Link>

      {isAuthenticated ? (

        <>

          <Link to="/profile">
            Profile
          </Link>

          <span>
            Welcome {user?.username}
          </span>

          <button onClick={logout}>
            Logout
          </button>

        </>

      ) : (

        <>

          <Link to="/login">
            Login
          </Link>

          <Link to="/register">
            Register
          </Link>

        </>

      )}

      <Link to="/notifications">
        Notifications
      </Link>

    </nav>
  );
};

export default Navbar;