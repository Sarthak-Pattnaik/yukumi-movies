import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import api
from "../../services/api";

const CommunityPreview =
  () => {

    const [
      activities,
      setActivities,
    ] = useState<any[]>([]);

    useEffect(() => {

      const fetchCommunity =
        async () => {

          try {

            const res =
              await api.get(
                "/movies/community"
              );

            setActivities(
              res.data.slice(0, 4)
            );

          } catch (error) {

            console.log(error);
          }
        };

      fetchCommunity();

    }, []);

    return (

      <section
        className="px-8 py-28 lg:px-20"
      >

        <div
          className="mb-16 flex items-end justify-between"
        >

          <div>

            <p
              className="mb-3 text-sm uppercase tracking-[0.3em] text-[#10b981]"
            >

              Community

            </p>

            <h2
              className="text-5xl font-black tracking-tight"
            >

              See what people are watching.
            </h2>

          </div>

          <Link
            to="/community"

            className="rounded-2xl border border-zinc-700 bg-black/40 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-[#10b981] hover:text-white"
          >

            Open Community

          </Link>

        </div>

        <div
          className="grid gap-8 lg:grid-cols-2"
        >

          {activities.map(
            (activity) => (

              <Link

                key={activity._id}

                to={`/movies/${activity.movie?.id}`}

                className="group overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#141414] transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]"
              >

                <div
                  className="flex"
                >

                  {activity.movie && (

                    <div
                      className="relative w-40 shrink-0 overflow-hidden"
                    >

                      <img
                        src={`https://image.tmdb.org/t/p/w500${activity.movie.poster_path}`}

                        alt={
                          activity.movie.title
                        }

                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div
                        className="absolute inset-0 bg-linear-to-t from-black/80 to-transparent"
                      />

                    </div>

                  )}

                  <div
                    className="flex flex-1 flex-col justify-between p-6"
                  >

                    <div>

                      <Link

                        to={`/profile/${activity.user?._id}`}

                        onClick={(e) =>
                          e.stopPropagation()
                        }

                        className="mb-4 flex w-fit items-center gap-3 transition-opacity hover:opacity-80"
                      >

                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10b981]/15 font-bold text-[#10b981]"
                        >

                          {
                            activity.user
                              ?.username?.[0]
                              ?.toUpperCase()
                          }

                        </div>

                        <div>

                          <p
                            className="font-semibold text-white"
                          >

                            {
                              activity.user
                                ?.username
                            }

                          </p>

                          <p
                            className="text-sm text-zinc-500"
                          >

                            Movie Activity

                          </p>

                        </div>

                      </Link>

                      <h3
                        className="mb-4 text-2xl font-bold leading-snug tracking-tight"
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

                        <div
                          className="rounded-2xl border border-zinc-800 bg-black/30 p-4"
                        >

                          <p
                            className="line-clamp-3 leading-7 text-zinc-300"
                          >

                            "
                            {
                              activity.text
                            }
                            "

                          </p>

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              </Link>
            )
          )}

        </div>

      </section>
    );
};

export default CommunityPreview;