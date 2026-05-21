import {
  useEffect,
  useState,
} from "react";

import PageWrapper
  from "../components/layout/PageWrapper";

import SectionTitle
  from "../components/layout/SectionTitle";

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

            Updates

          </p>

          <h1
            className="mb-6 text-6xl font-bold tracking-tight"
          >

            Notifications

          </h1>

          <p
            className="max-w-2xl text-lg leading-relaxed text-zinc-400"
          >

            Stay updated with
            follows, likes,
            and community
            interactions.

          </p>

        </div>

      </section>

      <section
        className="mt-20"
      >

        <SectionTitle
          title="Recent Activity"
        />

        <div
          className="space-y-6"
        >
          {notifications.map(
            (notification) => (

              <div
                key={notification._id}

                className="group rounded-3xl border border-zinc-800 bg-[#171717]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700 hover:bg-[#1b1b1b] hover:shadow-[0_0_35px_rgba(16,185,129,0.08)]"
              >

                <div
                  className="flex items-center justify-between"
                >

                  <div
                    className="flex items-center gap-5"
                  >

                    <div
                      className="flex h-14 w-14 items-center justify-center rounded-full bg-[#10b981]/15 text-xl font-bold text-[#10b981]"
                    >

                      {
                        notification
                          .senderId
                          ?.username?.[0]
                          ?.toUpperCase()
                      }

                    </div>

                    <div>

                      <h3
                        className="mb-1 text-xl font-semibold tracking-tight text-white"
                      >

                        {
                          notification
                            .senderId
                            ?.username
                        }

                      </h3>

                      <p
                        className="text-zinc-400"
                      >

                        {notification.type ===
                          "follow" &&
                          "started following you"}

                        {notification.type ===
                          "like" &&
                          "liked your review"}

                      </p>

                    </div>

                  </div>

                  <div
                    className="rounded-full border border-zinc-700 bg-black/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-zinc-500"
                  >

                    {notification.type}

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

export default Notifications;