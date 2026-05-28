import {
  Link,
} from "react-router-dom";

const HeroSection = () => {

  return (

    <section
      className="relative flex min-h-screen items-center overflow-hidden px-8 lg:px-20"
    >

      <div
        className="absolute inset-0"
      >

        <img
          src="https://image.tmdb.org/t/p/original/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"

          alt="Hero Backdrop"

          className="h-full w-full object-cover opacity-25"
        />

        <div
          className="absolute inset-0 bg-black/70"
        />

        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%)]"
        />

      </div>

      <div
        className="relative z-10 max-w-4xl"
      >

        <p
          className="mb-6 text-sm font-semibold uppercase tracking-[0.4em] text-[#10b981]"
        >

          Yukumi Movies

        </p>

        <h1
          className="mb-8 text-6xl font-black leading-[1.05] tracking-tight lg:text-8xl"
        >

          Track films.

          <br />

          Share opinions.

          <br />

          Build your

          <span
            className="text-[#10b981]"
          >

            {" "}
            cinematic identity.

          </span>

        </h1>

        <p
          className="max-w-2xl text-xl leading-9 text-zinc-400"
        >

          Discover movies,
          review favorites,
          follow friends,
          and create your
          personal cinematic journey.

        </p>

        <div
          className="mt-12 flex flex-wrap gap-5"
        >

          <Link
            to="/register"

            className="rounded-2xl bg-[#10b981] px-8 py-4 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]"
          >

            Get Started

          </Link>

          <Link
            to="/community"

            className="rounded-2xl border border-zinc-700 bg-black/40 px-8 py-4 text-lg font-semibold text-white transition-all duration-300 hover:border-[#10b981]"
          >

            Explore Community

          </Link>

        </div>

      </div>

    </section>
  );
};

export default HeroSection;