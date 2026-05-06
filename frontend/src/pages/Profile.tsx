import useAuthStore from "../store/authStore";

const Profile = () => {

  const { user } =
    useAuthStore();

  return (

    <div>

      <h1>Profile Page</h1>

      <h2>
        Username: {user?.username}
      </h2>

      <h2>
        Email: {user?.email}
      </h2>

    </div>
  );
};

export default Profile;