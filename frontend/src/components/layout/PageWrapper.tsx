import {
  type ReactNode,
} from "react";

type Props = {

  children: ReactNode;
};

const PageWrapper = ({
  children,
}: Props) => {

  return (

    <main
      className="page-container section-spacing"
    >

      {children}

    </main>
  );
};

export default PageWrapper;