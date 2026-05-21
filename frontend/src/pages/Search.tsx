import { useState } from "react";
import PageWrapper from "../components/layout/PageWrapper";
import api from "../services/api";
import MovieCard from "../components/movie/MovieCard";
import SectionTitle from "../components/layout/SectionTitle";

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

        <PageWrapper>

            <section
                className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#141414] px-10 py-20"
            >

                <div
                    className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_35%)]"
                />

                <div
                    className="relative z-10 max-w-3xl animate-[fadeIn_0.8s_ease]"
                >

                    <p
                        className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#10b981]"
                    >

                        Discover Cinema

                    </p>

                    <h1
                        className="mb-6 text-6xl font-bold leading-tight tracking-tight"
                    >

                        Track,
                        Review
                        &
                        Discover
                        Movies
                    </h1>

                    <p
                        className="mb-10 text-lg leading-relaxed text-zinc-400"
                    >

                        Explore films,
                        share reviews,
                        build watchlists,
                        and connect
                        with movie lovers.

                    </p>

                    <div
                        className="flex gap-4"
                    >

                        <input
                            type="text"

                            placeholder="Search for movies..."

                            value={query}

                            onChange={(e) =>
                                setQuery(
                                    e.target.value
                                )
                            }

                            className="h-14 w-full rounded-2xl border border-zinc-700 bg-black/40 px-5 text-white outline-none transition-all placeholder:text-zinc-500 focus:border-[#10b981]"
                        />

                        <button
                            onClick={handleSearch}

                            className="emerald-button h-14 whitespace-nowrap"
                        >

                            Search

                        </button>

                    </div>

                </div>

            </section>

            {movies.length > 0 && (

                <section
                    className="mt-16"
                >

                    <SectionTitle
                        title="Search Results"
                    />

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

            )}

            {movies.length === 0 && (

                <div
                    className="mt-20 text-center text-zinc-500"
                >

                    Search for a movie
                    to begin discovering.

                </div>

            )}

        </PageWrapper>
    );
};

export default Search;