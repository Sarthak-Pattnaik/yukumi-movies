import {
  useEffect,
  useState,
} from "react";
import {
  Link,
} from "react-router-dom";
import PageWrapper
  from "../components/layout/PageWrapper";

import SectionTitle
  from "../components/layout/SectionTitle";

import api from "../services/api";

import {
  useNavigate,
} from "react-router-dom";

import {

  Dialog,

  DialogContent,

  DialogHeader,

  DialogTitle,

} from "../components/ui/dialog";

import {

  Command,

  CommandEmpty,

  CommandGroup,

  CommandInput,

  CommandItem,

  CommandList,

} from "../components/ui/command";

const Community = () => {

  const [activities, setActivities] =
    useState<any[]>([]);

  const navigate =
    useNavigate();

  const [
    openSearch,
    setOpenSearch,
  ] = useState(false);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    users,
    setUsers,
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
            res.data
          );

        } catch (error) {

          console.log(error);
        }
      };

    fetchCommunity();

  }, []);

  const searchUsers =
    async (
      query: string
    ) => {

      try {

        if (!query.trim()) {

          setUsers([]);

          return;
        }

        const res =
          await api.get(

            `/auth/search/users?q=${query}`
          );

        setUsers(
          res.data
        );

      } catch (error) {

        console.log(error);
      }
    };

  useEffect(() => {

    if (
      search.trim().length < 1
    ) {

      setUsers([]);

      return;
    }

    const timeout =
      setTimeout(() => {

        searchUsers(
          search
        );

      }, 150);

    return () =>
      clearTimeout(timeout);

  }, [search]);

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

        <button

          onClick={() => {
            setOpenSearch(true);
          }}

          className="relative z-20 mt-12 cursor-pointer rounded-2xl border border-zinc-700 bg-black/40 px-6 py-3 text-sm font-semibold text-zinc-300 transition-all duration-300 hover:border-[#10b981] hover:text-white"
        >

          Search Users

        </button>

        <Dialog
          open={openSearch}

          onOpenChange={
            setOpenSearch
          }
        >

          <DialogContent
            className="border-zinc-800 bg-[#171717] text-white"
          >

            <DialogHeader>

              <DialogTitle
                className="text-3xl font-bold"
              >

                Discover Users

              </DialogTitle>

            </DialogHeader>

            <Command

              shouldFilter={false}

              className="mt-6 rounded-2xl border border-zinc-800 bg-black/40"
            >

              <CommandInput

                placeholder="Search users..."

                onValueChange={
                  setSearch
                }
              />

              <CommandList
                key={search}
              >

                <CommandEmpty>

                  No users found.

                </CommandEmpty>

                <CommandGroup>

                  {users.map(
                    (user) => (

                      <CommandItem

                        key={user._id}

                        onSelect={() => {

                          navigate(
                            `/users/${user._id}`
                          );

                          setOpenSearch(
                            false
                          );
                        }}

                        className="cursor-pointer"
                      >

                        <div
                          className="flex items-center gap-4"
                        >

                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#10b981]/15 font-bold text-[#10b981]"
                          >

                            {user.username?.[0]?.toUpperCase()}

                          </div>

                          <div>

                            <p
                              className="font-medium"
                            >

                              {
                                user.username
                              }

                            </p>

                            <p
                              className="text-sm text-zinc-500"
                            >

                              {
                                user.tagline
                              }

                            </p>

                          </div>

                        </div>

                      </CommandItem>
                    )
                  )}

                </CommandGroup>

              </CommandList>

            </Command>

          </DialogContent>

        </Dialog>

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

              <Link

                key={activity._id}

                to={`/movies/${activity.movie?.id}`}

                className="block"
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

                      <Link

                        to={`/users/${activity.user?._id}`}

                        onClick={(e) =>
                          e.stopPropagation()
                        }

                        className="mb-5 flex w-fit items-center gap-4"
                      >

                        <div
                          className="flex h-12 w-12 items-center justify-center rounded-full bg-[#10b981]/15 text-lg font-bold text-[#10b981]"
                        >

                          {
                            (
                              activity.user?.avatar &&
                              <img src={activity.user?.avatar}
                                className="h-12 w-12 rounded-full"
                              />
                            )

                            || activity.user?.username?.[0]?.toUpperCase()
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

                      </Link>

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

              </Link>
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