import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api from "../services/api";

const MovieDetails = () => {

  const { id } = useParams();

  const [movie, setMovie] =
    useState<any>(null);

  useEffect(() => {

    const fetchMovie = async () => {

      try {

        const res = await api.get(
          `/movies/${id}`
        );

        setMovie(res.data);

      } catch (error) {

        console.log(error);
      }
    };

    fetchMovie();

  }, [id]);

  if (!movie) {
    return <h1>Loading...</h1>;
  }

  const handleAddToList =
    async () => {

      try {

        await api.post(
          "/movies/list",
          {
            movieId: movie.id,

            status:
              "plan_to_watch",

            rating: 8,
          }
        );

        alert(
          "Movie added to list"
        );

      } catch (error) {

        console.log(error);

        alert(
          "Failed to add movie"
        );
      }
    };

  return (

    <div>

      <h1>
        {movie.title}
      </h1>

      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />

      <button onClick={handleAddToList}>
        Add To List
      </button>

      <p>
        {movie.overview}
      </p>

      <h3>
        Release Date:
        {movie.release_date}
      </h3>

      <h3>
        Rating:
        {movie.vote_average}
      </h3>

    </div>
  );
};

export default MovieDetails;