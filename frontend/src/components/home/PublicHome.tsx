import HeroSection
from "./HeroSection";

import TrendingSection
from "./TrendingSection";

import CommunityPreview
from "./CommunityPreview";

import FeaturesSection
from "./FeaturesSection";

import CTASection
from "./CTASection";

const Home = () => {

  return (

    <main
      className="min-h-screen overflow-hidden bg-[#0a0a0a] text-white"
    >

      <HeroSection />

      <TrendingSection />

      <CommunityPreview />

      <FeaturesSection />

      <CTASection />

    </main>
  );
};

export default Home;