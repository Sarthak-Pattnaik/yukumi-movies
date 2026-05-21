import {
  useEffect,
  useState,
} from "react";

import PageWrapper
  from "../components/layout/PageWrapper";

import SectionTitle
  from "../components/layout/SectionTitle";

import api from "../services/api";

const Community = () => {

  const [activities, setActivities] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchCommunity =
      async () => {

        try {

          const res =
            await api.get(
              "/movies/community/activity"
            );

          setActivities(
            res.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchCommunity();

  }, []);

  return (

    <PageWrapper>

      <section
        className="relative overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#141414] px-10 py-16"
      >

        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.12),transparent_35%)]"
        />

        <div
          className="relative z-10"
        >

          <p
            className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#10b981]"
          >

            Social

          </p>

          <h1
            className="mb-6 text-6xl font-bold tracking-tight"
          >

            Community

          </h1>

          <p
            className="max-w-3xl text-lg leading-relaxed text-zinc-400"
          >

            Follow movie lovers,
            discover reviews,
            and explore what
            your community
            is watching.

          </p>

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Latest Activity"
        />

        <div
          className="space-y-8"
        >
          {activities.map(
            (activity) => (

              <div
                key={activity._id}

                className="group overflow-hidden rounded-[2rem] border border-zinc-800 bg-[#171717]/80 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-[#1b1b1b] hover:shadow-[0_0_40px_rgba(16,185,129,0.08)]"
              >

                <div
                  className="flex"
                >

                  {activity.movie && (

                    <div
                      className="relative w-55 shrink-0 overflow-hidden"
                    >

                      <img
                        src={`https://image.tmdb.org/t/p/w500${activity.movie.poster_path}`}

                        alt={
                          activity.movie.title
                        }

                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      <div
                        className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"
                      />

                    </div>

                  )}

                  <div
                    className="flex flex-1 flex-col justify-between p-8"
                  >

                    <div>

                      <div
                        className="mb-5 flex items-center gap-4"
                      >

                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10b981]/15 text-lg font-bold text-[#10b981]"
                        >

                          {
                            activity.user
                              ?.username?.[0]
                              ?.toUpperCase()
                          }

                        </div>

                        <div>

                          <h3
                            className="text-xl font-semibold tracking-tight text-white"
                          >

                            {
                              activity.user
                                ?.username
                            }

                          </h3>

                          <p
                            className="text-sm text-zinc-500"
                          >

                            Movie Activity

                          </p>

                        </div>

                      </div>

                      <p
                        className="mb-4 text-2xl font-bold leading-snug tracking-tight text-white"
                      >

                        {activity.type ===
                          "review" &&
                          "reviewed"}

                        {activity.type ===
                          "completed" &&
                          "completed"}

                        {activity.type ===
                          "favorite" &&
                          "favorited"}

                        {activity.type ===
                          "follow" &&
                          "followed"}

                        {" "}

                        <span
                          className="text-[#10b981]"
                        >

                          {
                            activity.movie
                              ?.title
                          }

                        </span>

                      </p>

                      {activity.text && (

                        <div
                          className="rounded-2xl border border-zinc-800 bg-black/30 p-5"
                        >

                          <p
                            className="leading-8 text-zinc-300"
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

              </div>
            )
          )}

        </div>

      </section>

      {activities.length === 0 && (

        <div
          className="mt-20 rounded-3xl border border-zinc-800 bg-[#171717]/60 p-16 text-center"
        >

          <h3
            className="mb-4 text-3xl font-bold"
          >

            Your community is sleeping...

          </h3>

          <p
            className="text-zinc-500"
          >

            Follow users to
            start discovering
            movie activity.

          </p>

        </div>

      )}

    </PageWrapper>
  );
};

export default Community;