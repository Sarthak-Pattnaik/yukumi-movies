const features = [

  {

    title:
      "Track Everything",

    description:
      "Build your personal movie collection and keep your cinematic history organized.",
  },

  {

    title:
      "Review & Rate",

    description:
      "Share detailed opinions and discover how others feel about films.",
  },

  {

    title:
      "Follow Friends",

    description:
      "Stay connected with your community and discover what everyone is watching.",
  },
];

const FeaturesSection =
  () => {

    return (

      <section
        className="px-8 py-28 lg:px-20"
      >

        <div
          className="mb-16"
        >

          <p
            className="mb-3 text-sm uppercase tracking-[0.3em] text-[#10b981]"
          >

            Features

          </p>

          <h2
            className="text-5xl font-black tracking-tight"
          >

            Your cinematic platform.
          </h2>

        </div>

        <div
          className="grid gap-8 lg:grid-cols-3"
        >

          {features.map(
            (feature) => (

              <div
                key={
                  feature.title
                }

                className="rounded-[2rem] border border-zinc-800 bg-[#141414] p-10 transition-all duration-300 hover:border-zinc-700"
              >

                <h3
                  className="mb-6 text-3xl font-bold"
                >

                  {
                    feature.title
                  }

                </h3>

                <p
                  className="leading-8 text-zinc-400"
                >

                  {
                    feature.description
                  }

                </p>

              </div>
            )
          )}

        </div>

      </section>
    );
};

export default FeaturesSection;