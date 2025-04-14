import { useUserPlaylists } from "../apis/playlists/usePlaylists";
import { useUserSavedAlbums } from "../apis/albums/useAlbums"
import { useUserArtists } from "../apis/artists/useArtists";
import { useUserPodcasts } from "../apis/podcasts/usePodcasts"
import { useUserAudiobooks } from "../apis/audiobooks/useAudiobooks";

export function useLibraryTabData(selectedTab: string) {
  const playlists = useUserPlaylists(30, 0 , selectedTab === "Playlists");
  const podcasts = useUserPodcasts(selectedTab === "Podcasts");
  const audiobooks = useUserAudiobooks(selectedTab === "Audiobooks");
  const artists = useUserArtists(selectedTab === "Artists");
  const albums = useUserSavedAlbums(30, 0, selectedTab === "Albums");

  const map = {
    Playlists: playlists,
    Podcasts: podcasts,
    Audiobooks: audiobooks,
    Artists: artists,
    Albums: albums,
  };

  return map[selectedTab as keyof typeof map] ?? { data: [], isLoading: false };
}
