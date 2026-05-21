import {
  Link,
} from "react-router-dom";

type Props = {

  movie: any;
};

const MovieCard = ({
  movie,
}: Props) => {

  return (

    <Link
      to={`/movies/${movie.id}`}

      className="group relative overflow-hidden rounded-2xl bg-[#171717] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    >

      <div
        className="relative aspect-2/3 overflow-hidden"
      >

        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}

          alt={movie.title}

          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <div
          className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent opacity-90"
        />

        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow:
              "inset 0 -120px 80px rgba(0,0,0,0.9)",
          }}
        />

        <div
          className="absolute right-3 top-3 rounded-full bg-[#10b981] px-3 py-1 text-sm font-bold text-black shadow-lg"
        >

          {movie.vote_average?.toFixed(1)}

        </div>

        <div
          className="absolute bottom-0 left-0 w-full p-4"
        >

          <h3
            className="line-clamp-1 text-lg font-semibold text-white"
          >

            {movie.title}

          </h3>

          <p
            className="text-sm text-zinc-300"
          >

            {
              movie.release_date?.split(
                "-"
              )[0]
            }

          </p>

        </div>

      </div>

    </Link>
  );
};

export default MovieCard;