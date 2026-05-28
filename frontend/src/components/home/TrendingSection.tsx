import {
  useEffect,
  useState,
} from "react";

import api
from "../../services/api";

import MovieCard
from "../../components/movie/MovieCard";

const TrendingSection = () => {

  const [
    movies,
    setMovies,
  ] = useState<any[]>([]);

  useEffect(() => {

    const fetchTrending =
      async () => {

        try {

          const res =
            await api.get(
              "/movies/trending"
            );

          setMovies(
            res.data.results
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchTrending();

  }, []);

  return (

    <section
      className="px-8 py-28 lg:px-20"
    >

      <div
        className="mb-12 flex items-end justify-between"
      >

        <div>

          <p
            className="mb-3 text-sm uppercase tracking-[0.3em] text-[#10b981]"
          >

            Discover

          </p>

          <h2
            className="text-5xl font-black tracking-tight"
          >

            Trending Movies

          </h2>

        </div>

      </div>

      <div
        className="movie-grid"
      >

        {movies.map(
          (movie) => (

            <MovieCard
              key={movie.id}
              movie={movie}
            />
          )
        )}

      </div>

    </section>
  );
};

export default TrendingSection;