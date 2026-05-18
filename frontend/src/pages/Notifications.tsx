import {
  useEffect,
  useState,
} from "react";

import api from "../services/api";

const Notifications = () => {

  const [
    notifications,
    setNotifications,
  ] = useState<any[]>([]);

  useEffect(() => {

    const fetchNotifications =
      async () => {

        try {

          const res =
            await api.get(
              "/auth/notifications"
            );

          setNotifications(
            res.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchNotifications();

  }, []);

  return (

    <div>

      <h1>
        Notifications
      </h1>

      {notifications.map(
        (notification) => (

          <div
            key={
              notification._id
            }

            style={{
              border:
                "1px solid gray",

              padding: "10px",

              marginTop: "10px",
            }}
          >

            <h3>

              {
                notification
                  .senderId
                  ?.username
              }

            </h3>

            <p>

              {notification.type ===
                "follow" &&
                "started following you"}

              {notification.type ===
                "like" &&
                "liked your review"}

            </p>

          </div>

        )
      )}

    </div>
  );
};

export default Notifications;