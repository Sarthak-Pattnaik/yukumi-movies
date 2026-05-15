import {
  useEffect,
  useState,
} from "react";

import useAuthStore from "../store/authStore";

import api from "../services/api";


const MovieCard = ({
  movie,
  refreshMovies,
}: any) => {

  const [status, setStatus] =
    useState(movie.status);

  const [rating, setRating] =
    useState(movie.rating);

  const [favorite, setFavorite] =
    useState(movie.favorite);

  const handleUpdate =
    async () => {

      try {

        await api.patch(

          `/movies/list/${movie._id}`,

          {
            status,
            rating,
            favorite,
          }
        );

        alert(
          "Movie updated"
        );

        refreshMovies();

      } catch (error) {

        console.log(error);

        alert(
          "Update failed"
        );
      }
    };

  const handleDelete =
    async () => {

      try {

        await api.delete(
          `/movies/list/${movie._id}`
        );

        alert(
          "Movie removed"
        );

        refreshMovies();

      } catch (error) {

        console.log(error);

        alert(
          "Delete failed"
        );
      }
    };

  return (

    <div
      style={{
        width: "220px",

        border:
          "1px solid gray",

        padding: "10px",

        borderRadius: "10px",
      }}
    >

      <img
        src={`https://image.tmdb.org/t/p/w200${movie.movie.poster_path}`}
        alt={movie.movie.title}
        style={{
          width: "100%",
        }}
      />

      <h3>
        {movie.movie.title}
      </h3>

      <p>
        {movie.movie.release_date}
      </p>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
      >

        <option value="watching">
          Watching
        </option>

        <option value="completed">
          Completed
        </option>

        <option value="plan_to_watch">
          Plan To Watch
        </option>

        <option value="dropped">
          Dropped
        </option>

      </select>

      <br />
      <br />

      <input
        type="number"
        min="1"
        max="10"
        value={rating}
        onChange={(e) =>
          setRating(
            Number(e.target.value)
          )
        }
      />

      <br />
      <br />

      <label>

        <input
          type="checkbox"
          checked={favorite}
          onChange={(e) =>
            setFavorite(
              e.target.checked
            )
          }
        />

        Favorite

      </label>

      <br />
      <br />

      <button onClick={handleUpdate}>
        Save
      </button>

      <button
        onClick={handleDelete}
        style={{
          marginTop: "10px",
        }}
      >
        Remove
      </button>

    </div>
  );
};

const Profile = () => {

  const { user } =
    useAuthStore();

  const [movies, setMovies] =
    useState<any[]>([]);

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

  useEffect(() => {

    fetchMovies();

  }, []);

  const completedMovies =
    movies.filter(
      (movie) =>
        movie.status ===
        "completed"
    );

  const watchingMovies =
    movies.filter(
      (movie) =>
        movie.status ===
        "watching"
    );

  const plannedMovies =
    movies.filter(
      (movie) =>
        movie.status ===
        "plan_to_watch"
    );

  const droppedMovies =
    movies.filter(
      (movie) =>
        movie.status ===
        "dropped"
    );

  const favoriteMovies =
    movies.filter(
      (movie) => movie.favorite
    );

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

      <h2>Favorites</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        {favoriteMovies.map(
          (movie) => (

            <MovieCard
              key={movie._id}
              movie={movie}
              refreshMovies={fetchMovies}
            />

          )
        )}

      </div>

      <h2>
        Your Movie List
      </h2>

      <hr />

      <h2>Completed</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        {completedMovies.map(
          (movie) => (

            <MovieCard
              key={movie._id}
              movie={movie}
              refreshMovies={fetchMovies}
            />

          )
        )}

      </div>

      <hr />

      <h2>Watching</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        {watchingMovies.map(
          (movie) => (

            <MovieCard
              key={movie._id}
              movie={movie}
              refreshMovies={fetchMovies}
            />

          )
        )}

      </div>

      <hr />

      <h2>Plan To Watch</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        {plannedMovies.map(
          (movie) => (

            <MovieCard
              key={movie._id}
              movie={movie}
              refreshMovies={fetchMovies}
            />

          )
        )}

      </div>

      <hr />

      <h2>Dropped</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >

        {droppedMovies.map(
          (movie) => (

            <MovieCard
              key={movie._id}
              movie={movie}
              refreshMovies={fetchMovies}
            />

          )
        )}

      </div>

    </div>
  );
};

export default Profile;