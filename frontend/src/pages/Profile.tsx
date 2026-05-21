import {
  useEffect,
  useState,
} from "react";

import PageWrapper
  from "../components/layout/PageWrapper";

import SectionTitle
  from "../components/layout/SectionTitle";

import StatCard
  from "../components/profile/StatCard";

import MovieCard
  from "../components/movie/MovieCard";

import api from "../services/api";



const Profile = () => {

  const [user, setUser] =
    useState<any>(null);

  const [movies, setMovies] =
    useState<any[]>([]);

  const [stats, setStats] =
    useState<any>(null);

  const [avatar, setAvatar] =
    useState("");

  const [tagline, setTagline] =
    useState("");

  const [bio, setBio] =
    useState("");

  const [
    showEditProfile,
    setShowEditProfile,
  ] = useState(false);

  const fetchUser =
    async () => {

      try {

        const res =
          await api.get(
            "/auth/me"
          );

        setUser(res.data);

        setAvatar(
          res.data.avatar || ""
        );

        setTagline(
          res.data.tagline || ""
        );

        setBio(
          res.data.bio || ""
        );

      } catch (error) {

        console.log(error);
      }
    };

  const handleProfileUpdate =
    async () => {

      try {

        const res =
          await api.patch(
            "/auth/profile/update",

            {
              avatar,
              tagline,
              bio,
            }
          );

        setUser(res.data);

      } catch (error) {

        console.log(error);
      }
    };

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

  const fetchStats =
    async () => {

      try {

        const res =
          await api.get(
            "/movies/stats/user"
          );

        setStats(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {
    fetchUser();
    fetchMovies();
    fetchStats();
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

    <PageWrapper>

      <section
        className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#141414] px-10 py-16 "
      >

        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_35%)]"
        />

        <div
          className="relative z-10 flex items-center gap-8"
        >

          <div className="flex h-48 w-48 items-center justify-center rounded-full bg-[#10b981]/15 text-5xl font-bold text-[#10b981] overflow-hidden">
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.username}
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              user?.username?.[0]?.toUpperCase()
            )}
          </div>

          <div>

            <p
              className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#10b981]"
            >

              {user?.tagline}

            </p>

            <h1
              className="mb-4 text-6xl font-bold tracking-tight"
            >

              {user?.username}

            </h1>

            <p
              className="max-w-2xl text-lg leading-relaxed text-zinc-400"
            >

              {user?.bio}

            </p>

          </div>

        </div>

      </section>

      <div
        className="mt-8 flex justify-end"
      >

        <button
          onClick={() =>
            setShowEditProfile(
              !showEditProfile
            )
          }

          className="rounded-2xl border border-zinc-700 bg-black/40 px-5 py-3 text-sm font-medium text-zinc-300 transition-all duration-300 hover:border-[#10b981] hover:text-white"
        >

          {showEditProfile
            ? "Close Editor"
            : "Edit Profile"}

        </button>

      </div>

      {showEditProfile && (
        <section
          className="mt-10 rounded-3xl border border-zinc-800 bg-[#171717]/80 p-8"
        >

          <div
            className="mb-8 flex items-center justify-between"
          >

            <div>

              <p
                className="mb-2 text-sm font-semibold uppercase tracking-[0.3em] text-[#10b981]"
              >

                Personalize

              </p>

              <h2
                className="text-3xl font-bold tracking-tight"
              >

                Edit Profile

              </h2>

            </div>

          </div>
          <div
            className="space-y-5 grid gap-5"
          >

            <input
              type="text"

              placeholder="Avatar URL"

              value={avatar}

              onChange={(e) =>
                setAvatar(
                  e.target.value
                )
              }

              className="w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-zinc-200 outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-[#10b981] focus:bg-black/60"
            />

            <input
              type="text"

              placeholder="Tagline"

              value={tagline}

              onChange={(e) =>
                setTagline(
                  e.target.value
                )
              }

              className="w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-zinc-200 outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-[#10b981] focus:bg-black/60"
            />

            <textarea
              rows={4}

              placeholder="Bio"

              value={bio}

              onChange={(e) =>
                setBio(
                  e.target.value
                )
              }

              className="w-full rounded-2xl border border-zinc-700 bg-black/40 p-4 text-zinc-200 outline-none transition-all duration-300 placeholder:text-zinc-500 focus:border-[#10b981] focus:bg-black/60"
            />

            <button
              onClick={
                handleProfileUpdate
              }

              className="emerald-button"
            >

              Save Profile

            </button>

          </div>

        </section>
      )}

      {stats && (

        <section
          className="mt-16"
        >

          <SectionTitle
            title="Statistics"
          />

          <div
            className="grid grid-cols-2 gap-6 lg:grid-cols-4"
          >

            <StatCard
              label="Movies"
              value={stats.totalMovies}
            />

            <StatCard
              label="Completed"
              value={stats.completedMovies}
            />

            <StatCard
              label="Favorites"
              value={stats.favoriteMovies}
            />

            <StatCard
              label="Reviews"
              value={stats.totalReviews}
            />

            <StatCard
              label="Watching"
              value={stats.watchingMovies}
            />

            <StatCard
              label="Planned"
              value={stats.plannedMovies}
            />

            <StatCard
              label="Dropped"
              value={stats.droppedMovies}
            />

            <StatCard
              label="Average"
              value={stats.averageRating}
            />

          </div>

        </section>

      )}

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Favorites"
        />

        <div
          className="movie-grid"
        >

          {favoriteMovies.map(
            (movie) => (

              <MovieCard
                key={movie._id}
                movie={movie.movie}
              />

            )
          )}

          {favoriteMovies.length === 0 && (
            <p className="text-zinc-500">
              No favorite movies yet.
            </p>
          )}

        </div>

      </section>


      <section
        className="mt-20"
      >

        <SectionTitle
          title="Completed"
        />

        <div
          className="movie-grid"
        >

          {completedMovies.map(
            (movie) => (

              <MovieCard
                key={movie._id}
                movie={movie.movie}
              />

            )
          )}

          {completedMovies.length === 0 && (
            <p className="text-zinc-500">
              No completed movies yet.
            </p>
          )}

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Watching"
        />

        <div
          className="movie-grid"
        >

          {watchingMovies.map(
            (movie) => (

              <MovieCard
                key={movie._id}
                movie={movie.movie}
              />

            )
          )}

          {watchingMovies.length === 0 && (
            <p className="text-zinc-500">
              No movies currently watching.
            </p>
          )}

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Plan to Watch"
        />

        <div
          className="movie-grid"
        >

          {plannedMovies.map(
            (movie) => (

              <MovieCard
                key={movie._id}
                movie={movie.movie}
              />

            )
          )}

          {plannedMovies.length === 0 && (
            <p className="text-zinc-500">
              No planned movies yet.
            </p>
          )}

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Dropped"
        />

        <div
          className="movie-grid"
        >

          {droppedMovies.map(
            (movie) => (

              <MovieCard
                key={movie._id}
                movie={movie.movie}
              />

            )
          )}

          {droppedMovies.length === 0 && (
            <p className="text-zinc-500">
              No dropped movies yet.
            </p>
          )}

        </div>

      </section>

    </PageWrapper>
  );
};

export default Profile;