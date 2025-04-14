import GreetingSection from "../components/homepage/GreetingSection";
import TopTracksSection from "../components/homepage/TopTracksSection";
import SavedAlbumsSection from "../components/homepage/SavedAlbumsSection";
import PlaylistsSection from "../components/homepage/PlaylistsSection";
import RecentlyPlayedSection from "../components/homepage/RecentlyPlayedSection";

function HomePage() {
  return (
    <div className="p-4">
      <GreetingSection />
      <TopTracksSection />
      <SavedAlbumsSection />
      <PlaylistsSection />
      <RecentlyPlayedSection />
    </div>
  );
}

export default HomePage;
