import {
  Link,
} from "react-router-dom";

const CTASection = () => {

  return (

    <section
      className="px-8 py-32 lg:px-20"
    >

      <div
        className="relative overflow-hidden rounded-[3rem] border border-zinc-800 bg-[#141414] px-10 py-24 text-center"
      >

        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.18),transparent_35%)]"
        />

        <div
          className="relative z-10"
        >

          <h2
            className="mx-auto max-w-4xl text-6xl font-black leading-tight tracking-tight"
          >

            Start building your cinematic identity today.
          </h2>

          <p
            className="mx-auto mt-8 max-w-2xl text-xl leading-9 text-zinc-400"
          >

            Join Yukumi Movies and turn movie watching into a social experience.

          </p>

          <Link
            to="/register"

            className="mt-12 inline-flex rounded-2xl bg-[#10b981] px-10 py-5 text-lg font-semibold text-black transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_40px_rgba(16,185,129,0.25)]"
          >

            Create Account

          </Link>

        </div>

      </div>

    </section>
  );
};

export default CTASection;