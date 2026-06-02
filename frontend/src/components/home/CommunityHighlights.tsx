import {
  useEffect,
  useState,
  
} from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import api
  from "../../services/api";

const CommunityHighlights =
  () => {
    const navigate = useNavigate();
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
                "/movies/community/activity"
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
        className="px-8 py-24 lg:px-20"
      >

        <div
          className="mb-14 flex items-end justify-between"
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

              Your community is active.
            </h2>

          </div>

          <Link
            to="/community"

            className="rounded-2xl border border-zinc-700 bg-black/40 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-[#10b981] hover:text-white"
          >

            Open Feed

          </Link>

        </div>

        <div
          className="grid gap-8 lg:grid-cols-2"
        >

          {activities.map(
            (activity) => (

              <div
                key={activity._id}
                onClick={() => navigate(`/movies/${activity.movie?.id}`)}
                className="group cursor-pointer overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#141414] transition-all duration-300 hover:border-zinc-700 hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]"
              >

                <div
                  className="flex"
                >

                  {activity.movie && (

                    <div
                      className="relative w-36 shrink-0 overflow-hidden"
                    >

                      <img
                        src={`https://image.tmdb.org/t/p/w500${activity.movie.poster_path}`}

                        alt={
                          activity.movie.title
                        }

                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                        className="text-2xl font-bold leading-snug tracking-tight"
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
                          className="mt-4 line-clamp-3 leading-7 text-zinc-400"
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
    );
  };

export default CommunityHighlights;