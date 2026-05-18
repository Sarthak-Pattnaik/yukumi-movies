import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const Feed = () => {

  const [activities, setActivities] =
    useState<any[]>([]);

  useEffect(() => {

    const fetchFeed =
      async () => {

        try {

          const res =
            await api.get(
              "/movies/feed/activity"
            );

          setActivities(
            res.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchFeed();

  }, []);

  return (

    <div>

      <h1>
        Activity Feed
      </h1>

      {activities.map(
        (activity) => (

          <div
            key={activity._id}
            style={{
              border:
                "1px solid gray",

              padding: "15px",

              marginTop: "15px",

              display: "flex",

              gap: "20px",
            }}
          >

            {activity.movie && (

              <img
                src={`https://image.tmdb.org/t/p/w200${activity.movie.poster_path}`}
                alt={
                  activity.movie.title
                }

                style={{
                  width: "120px",
                }}
              />

            )}

            <div>

              <h3>
                {
                  activity.user
                    ?.username
                }
              </h3>

              <p>

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

                {activity.movie?.title}

              </p>

              {activity.text && (

                <p>
                  "{activity.text}"
                </p>

              )}

            </div>

          </div>
        )
      )}

    </div>
  );
};

export default Feed;