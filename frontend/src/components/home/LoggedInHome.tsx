import PersonalizedHero
from "./PersonalizedHero";

import ContinueWatching
from "./ContinueWatching";

import StatsOverview
from "./StatsOverview";

import CommunityHighlights
from "./CommunityHighlights";


const LoggedInHome =
  () => {

    return (

      <main
        className="min-h-screen overflow-hidden bg-[#0a0a0a] text-white"
      >

        <PersonalizedHero />

        <ContinueWatching />

        <StatsOverview />

        <CommunityHighlights />

      </main>
    );
};

export default LoggedInHome;