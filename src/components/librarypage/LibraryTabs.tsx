import {
  useNavigate,
  createSearchParams,
  useSearchParams,
} from "react-router-dom";
import SpotifyButton from "../SpotifyButton";
import { useQueryClient } from "@tanstack/react-query";
import { getUserPlaylists } from "../../apis/playlists/playlists";
import { getPodcasts } from "../../apis/podcasts/podcasts";
import { getUserArtists } from "../../apis/artists/artists";
import { getUserSavedAlbums } from "../../apis/albums/albums";
import { getUserAudiobooks } from "../../apis/audiobooks/audiobooks";

const LibraryTabs = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedTab = searchParams.get("tab") || "Playlists";
  const queryClient = useQueryClient();

  const onTabChange = (tabName: string) => {
    navigate({
      pathname: "/library",
      search: createSearchParams({ tab: tabName }).toString(),
    });
  };

  // userPlaylists userPodcasts userAudiobooks userArtists userAlbums

  const handlePrefetch = (label: string) => {
    const queryMap: Record<string, () => Promise<unknown>> = {
      Playlists: () => getUserPlaylists(),
      Podcasts: () => getPodcasts(),
      Audiobooks: () => getUserAudiobooks(),
      Artists: () => getUserArtists(),
      Albums: () => getUserSavedAlbums(),
    };

    queryClient.prefetchQuery({
      queryKey: ["user" + label],
      queryFn: queryMap[label],
      staleTime: 1000 * 60 * 50,
    });
  };

  const tabs = [
    { label: "Playlists" },
    { label: "Podcasts" },
    { label: "Audiobooks" },
    { label: "Artists" },
    { label: "Albums" },
  ];

  const renderedLibraryTabs = tabs.map((item) => {
    return (
      <SpotifyButton
        variant="secondary"
        key={item.label}
        className={`${
          selectedTab === item.label ? "bg-neutral-700 text-white" : ""
        } px-12 py-4`}
        onClick={() => onTabChange(item.label)}
        onMouseEnter={() => handlePrefetch(item.label)}
        onFocus={() => handlePrefetch(item.label)}
        onTouchStart={() => handlePrefetch(item.label)}
      >
        {item.label}
      </SpotifyButton>
    );
  });

  return <>{renderedLibraryTabs}</>;
};

export default LibraryTabs;
