import {
  useEffect,
  useState,
} from "react";

import useAuthStore from "../store/authStore";

import api from "../services/api";

const Profile = () => {

  const { user } =
    useAuthStore();

  const [movies, setMovies] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchMovies =
      async () => {

        try {

          const res =
            await api.get(
              "/movies/user/list"
            );

          setMovies(res.data);

        } catch (error) {

          console.log(error);
        }
      };

    fetchMovies();

  }, []);

  return (

    <div>

      <h1>Profile Page</h1>

      <h2>
        Username:
        {user?.username}
      </h2>

      <h2>
        Email:
        {user?.email}
      </h2>

      <hr />

      <h2>
        Your Movie List
      </h2>

      {movies.map((movie) => (

        <div
          key={movie._id}
          style={{
            marginTop: "20px",

            border: "1px solid gray",

            padding: "20px",
          }}
        >

          <img
            src={`https://image.tmdb.org/t/p/w200${movie.movie.poster_path}`}
            alt={movie.movie.title}
          />

          <h2>
            {movie.movie.title}
          </h2>

          <p>
            {movie.movie.release_date}
          </p>

          <p>
            Status:
            {movie.status}
          </p>

          <p>
            Your Rating:
            {movie.rating}
          </p>

        </div>

      ))}

    </div>
  );
};

export default Profile;