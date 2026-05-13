import { useState } from "react";
import {
    Link,
} from "react-router-dom";
import api from "../services/api";

const Search = () => {

    const [query, setQuery] =
        useState("");

    const [movies, setMovies] =
        useState<any[]>([]);

    const handleSearch = async () => {

        try {

            const res = await api.get(
                `/movies/search?query=${query}`
            );

            setMovies(res.data);

        } catch (error) {

            console.log(error);
        }
    };

    return (

        <div>

            <h1>Movie Search</h1>

            <input
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) =>
                    setQuery(e.target.value)
                }
            />

            <button onClick={handleSearch}>
                Search
            </button>

            <div>

                {movies.map((movie) => (

                    <Link
                        to={`/movies/${movie.id}`}
                        key={movie.id}
                        style={{
                            display: "block",
                            marginTop: "20px",
                        }}
                    >

                        <h2>
                            {movie.title}
                        </h2>

                        <p>
                            {movie.release_date}
                        </p>

                        {movie.poster_path && (

                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />

                        )}

                    </Link>

                ))}

            </div>

        </div>
    );
};

export default Search;