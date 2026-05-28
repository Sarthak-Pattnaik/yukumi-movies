import {
  Link,
} from "react-router-dom";

import {
  useAuthStore,
} from "../../store/authStore";

const PersonalizedHero =
  () => {

    const user =
      useAuthStore(
        (state) =>
          state.user
      );

    return (

      <section
        className="relative overflow-hidden px-8 py-28 lg:px-20"
      >

        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_35%)]"
        />

        <div
          className="relative z-10 flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between"
        >

          <div>

            <p
              className="mb-4 text-sm uppercase tracking-[0.4em] text-[#10b981]"
            >

              Welcome Back

            </p>

            <h1
              className="max-w-4xl text-6xl font-black leading-tight tracking-tight lg:text-7xl"
            >

              Continue building your cinematic identity,
              <span
                className="text-[#10b981]"
              >

                {" "}
                {user?.username}

              </span>

            </h1>

            <p
              className="mt-8 max-w-2xl text-xl leading-9 text-zinc-400"
            >

              Track films,
              share reviews,
              and discover what your community is watching.

            </p>

            <div
              className="mt-12 flex flex-wrap gap-5"
            >

              <Link
                to="/community"

                className="rounded-2xl bg-[#10b981] px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]"
              >

                Open Community

              </Link>

              <Link
                to="/profile"

                className="rounded-2xl border border-zinc-700 bg-black/40 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-[#10b981]"
              >

                View Profile

              </Link>

            </div>

          </div>

          <div
            className="flex h-44 w-44 items-center justify-center overflow-hidden rounded-full border border-[#10b981]/30 bg-[#10b981]/10"
          >

            {user?.avatar ? (

              <img
                src={user.avatar}

                alt={user.username}

                className="h-full w-full object-cover"
              />

            ) : (

              <span
                className="text-6xl font-black text-[#10b981]"
              >

                {user?.username?.[0]?.toUpperCase()}

              </span>

            )}

          </div>

        </div>

      </section>
    );
  };

export default PersonalizedHero;