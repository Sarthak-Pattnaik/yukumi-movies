import {
  type ReactNode,
} from "react";

type Props = {

  children: ReactNode;

  title: string;

  subtitle: string;
};

const AuthLayout = ({
  children,
  title,
  subtitle,
}: Props) => {

  return (

    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f0f0f] px-6"
    >

      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.15),transparent_35%)]"
      />

      <div
        className="relative z-10 w-full max-w-md rounded-[2rem] border border-zinc-800 bg-[#171717]/80 p-10 backdrop-blur-xl animate-[fadeIn_0.5s_ease]"
      >

        <div
          className="mb-10"
        >

          <p
            className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#10b981]"
          >

            YukumiMovies

          </p>

          <h1
            className="mb-4 text-5xl font-bold tracking-tight text-white"
          >

            {title}

          </h1>

          <p
            className="leading-relaxed text-zinc-400"
          >

            {subtitle}

          </p>

        </div>

        {children}

      </div>

    </div>
  );
};

export default AuthLayout;