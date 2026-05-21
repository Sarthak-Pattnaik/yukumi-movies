type Props = {

  label: string;

  value: string | number;
};

const StatCard = ({
  label,
  value,
}: Props) => {

  return (

    <div
      className="rounded-3xl border border-zinc-800 bg-[#171717]/80 p-6 backdrop-blur-sm transition-all duration-300 hover:border-zinc-700"
    >

      <p
        className="mb-2 text-sm uppercase tracking-[0.2em] text-zinc-500"
      >

        {label}

      </p>

      <h3
        className="text-4xl font-bold tracking-tight"
      >

        {value}

      </h3>

    </div>
  );
};

export default StatCard;