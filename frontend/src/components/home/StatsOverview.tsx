import {
  useEffect,
  useState,
} from "react";

import api
  from "../../services/api";

const StatsOverview =
  () => {

    const [
      stats,
      setStats,
    ] = useState({

      totalMovies: 0,

      completedMovies: 0,

      favoriteMovies: 0,

      totalReviews: 0,

      averageRating: 0,
    });

    useEffect(() => {

      const fetchStats =
        async () => {

          try {

            const res =
              await api.get(
                "/movies/stats/user"
              );

            setStats(
              res.data
            );

          } catch (error) {

            console.log(error);
          }
        };

      fetchStats();

    }, []);

    const cards = [

      {
        label:
          "Movies Tracked",

        value:
          stats.totalMovies,
      },

      {
        label:
          "Completed",

        value:
          stats.completedMovies,
      },

      {
        label:
          "Favorites",

        value:
          stats.favoriteMovies,
      },

      {
        label:
          "Reviews",

        value:
          stats.totalReviews,
      },

      {
        label:
          "Avg Rating",

        value:
          stats.averageRating,
      },
    ];

    return (

      <section
        className="px-8 py-20 lg:px-20"
      >

        <div
          className="grid gap-6 lg:grid-cols-5"
        >

          {cards.map(
            (card) => (

              <div
                key={card.label}

                className="rounded-[2rem] border border-zinc-800 bg-[#141414] p-10"
              >

                <p
                  className="text-sm uppercase tracking-[0.3em] text-zinc-500"
                >

                  {card.label}

                </p>

                <h3
                  className="mt-6 text-5xl font-black text-[#10b981]"
                >

                  {card.value}

                </h3>

              </div>
            )
          )}

        </div>

      </section>
    );
  };

export default StatsOverview;