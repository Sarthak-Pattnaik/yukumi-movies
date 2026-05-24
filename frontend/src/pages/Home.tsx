import { useAuthStore } from "../store/authStore";

const Home = () => {

  const {
    user,
    isAuthenticated,
    logout,
  } = useAuthStore();

  return (

    <div>

      <h1>Home Page</h1>

      {isAuthenticated ? (

        <div>

          <h2>
            Welcome {user?.username}
          </h2>

          <button onClick={logout}>
            Logout
          </button>

        </div>

      ) : (

        <h2>
          Not Logged In
        </h2>

      )}

    </div>
  );
};

export default Home;