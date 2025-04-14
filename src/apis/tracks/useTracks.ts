import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTopTracks, getRecentlyPlayedTracks, checkIfTrackIsSaved, getUserSavedTracks, saveTracks, unsaveTracks} from './tracks';
import { Track, PlayHistory } from '@spotify/web-api-ts-sdk';

export function useTopTracks() {
  return useQuery<Track[]>({
    queryKey: ['topTracks'],
    queryFn: getTopTracks,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export function useRecentlyPlayedTracks(limit = 10, enabled = true) {
  return useQuery<PlayHistory[]>({
    queryKey: ['recentlyPlayed', limit],
    queryFn: () => getRecentlyPlayedTracks(limit),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};

export const useCheckIfTrackIsSaved = (
  trackIds: string[],
  enabled = true
) => {
  return useQuery<boolean[]>({
    queryKey: ["tracks", "savedStatus"],
    queryFn: () => checkIfTrackIsSaved(trackIds),
    enabled: enabled && trackIds.length > 0,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserSavedTracks = (
  limit = 50,
  offset = 0,
  enabled = true
) => {
  return useQuery<Track[]>({
    queryKey: ["userSavedTracks"],
    queryFn: () => getUserSavedTracks(limit, offset),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSaveTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackId: string) => saveTracks([trackId]),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tracks', 'savedStatus'],
      });
      queryClient.invalidateQueries({
        queryKey: ['userSavedTracks'],
      });
    }
  });
};

export const useUnsaveTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackId: string) => unsaveTracks([trackId]),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tracks', 'savedStatus'],
      });
      queryClient.invalidateQueries({
        queryKey: ['userSavedTracks'],
      });
    },
  });
};
