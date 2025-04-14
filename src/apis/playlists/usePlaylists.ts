import { useQuery } from '@tanstack/react-query';
import { getUserPlaylists, getPlaylistById } from './playlists';
import { Playlist} from '@spotify/web-api-ts-sdk';

export function useUserPlaylists(limit = 20, offset = 0, enabled = true) {
  return useQuery<Playlist[]>({
    queryKey: ['userPlaylists'],
    queryFn: () => getUserPlaylists(limit, offset),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const usePlaylistById = (
  playlistId: string,
  enabled = true
) => {
  return useQuery<Playlist>({
    queryKey: ["playlist", playlistId],
    queryFn: () => getPlaylistById(playlistId),
    enabled: enabled && !!playlistId,
    staleTime: 1000 * 60 * 5,
  });
};
