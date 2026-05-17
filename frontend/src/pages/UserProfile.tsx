import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api from "../services/api";

const UserProfile = () => {

  const { id } = useParams();

  const [user, setUser] =
    useState<any>(null);

  const fetchUser =
    async () => {

      try {

        const res =
          await api.get(
            `/auth/profile/${id}`
          );

        setUser(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchUser();

  }, []);

  const handleFollow =
    async () => {

      try {

        await api.patch(
          `/auth/follow/${id}`
        );

        fetchUser();

      } catch (error) {

        console.log(error);
      }
    };

  if (!user) {
    return <h1>Loading...</h1>;
  }

  return (

    <div>

      <h1>
        {user.username}
      </h1>

      <p>
        Followers:
        {user.followers.length}
      </p>

      <p>
        Following:
        {user.following.length}
      </p>

      <button
        onClick={handleFollow}
      >
        Follow / Unfollow
      </button>

    </div>
  );
};

export default UserProfile;