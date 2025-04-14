import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Artist, Track } from '@spotify/web-api-ts-sdk';
import { getUserArtists, getArtistById, checkIfFollowingArtist, followArtists, unfollowArtists, getArtistTopTracks } from './artists';

export const useUserArtists = (enabled: boolean, limit = 20) => {
  return useQuery<Artist[]>({
    queryKey: ['userArtists'],
    queryFn: () => getUserArtists(limit),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export const useArtistById = (artistId: string, enabled: boolean = true) => {
  return useQuery<Artist>({
    queryKey: ['artist', artistId],
    queryFn: () => getArtistById(artistId),
    enabled: enabled && !!artistId,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export const useCheckIfFollowingArtist = (artistIds: string[], enabled = true) => {
  return useQuery<boolean[]>({
    queryKey: ['artists', 'followStatus', { ids: artistIds }],
    queryFn: () => checkIfFollowingArtist(artistIds),
    enabled: enabled && artistIds.length > 0,
    staleTime: 1000 * 60 * 5, 
    retry: false,
  });
}

export const useFollowArtist = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (artistId: string) => followArtists([artistId]),
    onSuccess: (_data, artistId) => {
      queryClient.invalidateQueries({ queryKey: ['artists', 'followStatus', { ids: [artistId] }] });
    },
  });
}

export function useUnfollowArtist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (artistId: string) => unfollowArtists([artistId]),
    onSuccess: (_data, artistId) => {
      queryClient.invalidateQueries({ queryKey: ['artists', 'followStatus', { ids: [artistId] }] });
    },
  });
}

export const useArtistTopTracks = (id: string, enabled = true) =>
  useQuery<Track[]>({
    queryKey: ["artistTopTracks", id],
    queryFn: () => getArtistTopTracks(id),
    enabled: enabled && !!id,
    staleTime: 1000 * 60 * 5,
  });