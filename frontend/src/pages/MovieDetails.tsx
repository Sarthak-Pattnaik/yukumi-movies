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

  return (

    <div>

      <h1>
        {movie.title}
      </h1>

      <img
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />

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