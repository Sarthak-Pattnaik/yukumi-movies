import {
  useEffect,
  useState,
} from "react";

import MovieCard
from "../../components/movie/MovieCard";

import api
from "../../services/api";

const ContinueWatching =
  () => {

    const [
      movies,
      setMovies,
    ] = useState<any[]>([]);

    useEffect(() => {

      const fetchMovies =
        async () => {

          try {

            const res =
              await api.get(
                "/movies/user/list"
              );

            const filtered =
              res.data.filter(
                (movie: any) =>

                  movie.status ===
                    "watching"

                  ||

                  movie.status ===
                    "plan_to_watch"
              );

            setMovies(
              filtered.slice(0, 8)
            );

          } catch (error) {

            console.log(error);
          }
        };

      fetchMovies();

    }, []);

    return (

      <section
        className="px-8 py-20 lg:px-20"
      >

        <div
          className="mb-12"
        >

          <p
            className="mb-3 text-sm uppercase tracking-[0.3em] text-[#10b981]"
          >

            Your List

          </p>

          <h2
            className="text-5xl font-black tracking-tight"
          >

            Continue Watching
          </h2>

        </div>

        <div
          className="movie-grid"
        >

          {movies.map(
            (entry) => (

              <MovieCard
                key={entry._id}
                movie={entry.movie}
              />
            )
          )}

        </div>

      </section>
    );
};

export default ContinueWatching;