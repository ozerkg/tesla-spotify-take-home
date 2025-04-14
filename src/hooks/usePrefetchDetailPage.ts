import { useQueryClient } from '@tanstack/react-query';
import { getArtistById } from '../apis/artists/artists';
import { getAlbumById } from '../apis/albums/albums';
import { getPlaylistById } from '../apis/playlists/playlists';

export const usePrefetchDetailPage = () => {
  const queryClient = useQueryClient();

  return (tab: string, id: string) => {
    const queryMap: Record<string, { key: string; fn: (id: string) => Promise<unknown> }> = {
      Artists: { key: 'artist', fn: getArtistById },
      Albums: { key: 'album', fn: getAlbumById },
      Playlists: { key: 'playlist', fn: getPlaylistById },
    };

    const entry = queryMap[tab];
    if (!entry) return;

    queryClient.prefetchQuery({
      queryKey: [entry.key, id],
      queryFn: () => entry.fn(id),
      staleTime: 1000 * 60 * 30,
    });
  };
};
