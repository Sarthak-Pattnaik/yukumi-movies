import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import api
  from "../services/api";

import PageWrapper
  from "../components/layout/PageWrapper";

import SectionTitle
  from "../components/layout/SectionTitle";

import StatCard
  from "../components/profile/StatCard";

import MovieCard from "../components/movie/MovieCard";

const UserProfile = () => {

  const { id } = useParams();

  const [user, setUser] =
    useState<any>(null);

  const fetchUser =
    async () => {

      try {

        const res =
          await api.get(
            `/auth/profile/${id}`
          );

        setUser(res.data);

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    fetchUser();

  }, []);

  const handleFollow =
    async () => {

      try {

        await api.patch(
          `/auth/follow/${id}`
        );

        fetchUser();

      } catch (error) {

        console.log(error);
      }
    };

  if (!user) {
    return (

      <PageWrapper>

        <div
          className="flex min-h-[60vh] items-center justify-center text-zinc-500"
        >

          Loading profile...

        </div>

      </PageWrapper>
    );
  }

  console.log(user);

  return (

    <PageWrapper>

      <section
        className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#141414] px-10 py-16"
      >

        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_35%)]"
        />

        <div
          className="relative z-10 flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between"
        >

          <div
            className="flex items-center gap-8"
          >

            <div
              className="flex h-36 w-36 items-center justify-center overflow-hidden rounded-full bg-[#10b981]/15 text-5xl font-bold text-[#10b981]"
            >

              {user.avatar ? (

                <img
                  src={user.avatar}

                  alt={user.username}

                  className="h-full w-full object-cover"
                />

              ) : (

                user.username?.[0]?.toUpperCase()

              )}

            </div>

            <div>

              <p
                className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#10b981]"
              >

                {user.tagline}

              </p>

              <h1
                className="mb-5 text-6xl font-bold tracking-tight"
              >

                {user.username}

              </h1>

              <p
                className="max-w-2xl text-lg leading-relaxed text-zinc-400"
              >

                {user.bio}

              </p>

            </div>

          </div>

          <button
            onClick={handleFollow}

            className="rounded-2xl bg-[#10b981] px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(16,185,129,0.25)]"
          >

            Follow / Unfollow

          </button>

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Social Stats"
        />

        <div
          className="grid grid-cols-2 gap-6 lg:grid-cols-4"
        >

          <StatCard
            label="Followers"
            value={
              user.followers
                ?.length || 0
            }
          />

          <StatCard
            label="Following"
            value={
              user.following
                ?.length || 0
            }
          />

          <StatCard
            label="Watched"
            value={
              user.watchedCount || 0
            }
          />

          <StatCard
            label="Favorites"
            value={
              user.favoriteMovies
                ?.length || 0
            }
          />

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Favorite Movies"
        />

        <div
          className="movie-grid"
        >
          {!user.favoriteMovies?.length && (

            <p
              className="text-zinc-500"
            >

              No favorite movies yet.

            </p>

          )}
          {user.favoriteMovies?.map(
            (movie: any) => (

              <MovieCard
                key={movie._id}
                movie={movie.movie}
              />

            )
          )}

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Recent Reviews"
        />

        <div
          className="space-y-6"
        >
          {!user.recentReviews?.length && (

            <p
              className="text-zinc-500"
            >

              No reviews yet.

            </p>

          )}
          {user.recentReviews?.map(
            (review: any) => (

              <div
                key={review._id}

                className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#171717]/80 transition-all duration-300 hover:border-zinc-700"
              >

                <div
                  className="flex"
                >

                  {review.movie?.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w300${review.movie.poster_path}`}
                      alt={review.movie.title}
                      className="w-36 object-cover"
                    />
                  )}

                  <div
                    className="flex flex-1 flex-col justify-between p-6"
                  >

                    <div>

                      <p
                        className="mb-3 text-sm uppercase tracking-[0.2em] text-[#10b981]"
                      >

                        Review

                      </p>

                      <h3
                        className="mb-4 text-3xl font-bold tracking-tight"
                      >

                        {
                          review.movie
                            ?.title
                        }

                      </h3>

                      <p
                        className="leading-8 text-zinc-300"
                      >

                        {
                          review.reviewText
                        }

                      </p>

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Recent Activity"
        />

        <div
          className="space-y-5"
        >
          {!user.recentActivity?.length && (

            <p
              className="text-zinc-500"
            >

              No activity yet.

            </p>

          )}
          {user.recentActivity?.map(
            (activity: any) => (

              <div
                key={activity._id}

                className="overflow-hidden rounded-3xl border border-zinc-800 bg-[#171717]/70 transition-all duration-300 hover:border-zinc-700"
              >

                <div
                  className="flex"
                >

                  {activity.movie && (

                    <img
                      src={`https://image.tmdb.org/t/p/w300${activity.movie.poster_path}`}

                      alt={
                        activity.movie.title
                      }

                      className="w-30 object-cover"
                    />

                  )}

                  <div
                    className="flex flex-1 items-center justify-between p-6"
                  >

                    <div>

                      <p
                        className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-500"
                      >

                        Activity

                      </p>

                      <h3
                        className="mb-3 text-2xl font-bold tracking-tight"
                      >

                        {activity.type ===
                          "review" &&
                          "Reviewed"}

                        {activity.type ===
                          "completed" &&
                          "Completed"}

                        {activity.type ===
                          "favorite" &&
                          "Favorited"}

                        {" "}

                        <span
                          className="text-[#10b981]"
                        >

                          {
                            activity.movie
                              ?.title
                          }

                        </span>

                      </h3>

                      {activity.text && (

                        <p
                          className="leading-7 text-zinc-300"
                        >

                          "
                          {
                            activity.text
                          }
                          "

                        </p>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            )
          )}

        </div>

      </section>

    </PageWrapper>
  );
};

export default UserProfile;