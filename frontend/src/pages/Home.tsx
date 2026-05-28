import {
  useAuthStore,
} from "../store/authStore";

import LoggedInHome
from "../components/home/LoggedInHome";

import PublicHome
from "../components/home/PublicHome";

const Home = () => {

  const currentUser =
    useAuthStore(
      (state) =>
        state.user
    );

  return currentUser
    ? <LoggedInHome />
    : <PublicHome />;
};

export default Home;