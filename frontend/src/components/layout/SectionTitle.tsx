type Props = {

  title: string;
};

const SectionTitle = ({
  title,
}: Props) => {

  return (

    <h2
      className="mb-6 text-3xl font-bold tracking-tight"
    >

      {title}

    </h2>
  );
};

export default SectionTitle;