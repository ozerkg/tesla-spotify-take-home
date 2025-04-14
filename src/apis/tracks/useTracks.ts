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
  const sortedIds = [...trackIds].sort(); 
  return useQuery<Record<string, boolean>>({
    queryKey: ["tracks", "savedStatus", sortedIds],
    queryFn: async () => {
      const statuses = await checkIfTrackIsSaved(sortedIds);
      return Object.fromEntries(sortedIds.map((id, i) => [id, statuses[i]]));
    },
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
    queryKey: ["userSavedTracks", limit, offset],
    queryFn: () => getUserSavedTracks(limit, offset),
    enabled,
    staleTime: 1000 * 60 * 5,
  });
};

export const useSaveTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackId: string) => saveTracks([trackId]),
    onSuccess: (_data, trackId) => {
      queryClient.setQueriesData<Record<string, boolean>>(
        { queryKey: ['tracks', 'savedStatus'], exact: false },
        (prev) => {
          if (!prev) return prev;
          return { ...prev, [trackId]: true };
        }
      );

      queryClient.refetchQueries({
        predicate: (query) =>
          query.queryKey[0] === 'tracks' &&
          query.queryKey[1] === 'savedStatus' &&
          Array.isArray(query.queryKey[2]) &&
          query.queryKey[2].includes(trackId),
      });

      queryClient.invalidateQueries({ queryKey: ['userSavedTracks'] });
    },
  });
};

export const useUnsaveTrack = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (trackId: string) => unsaveTracks([trackId]),
    onSuccess: (_data, trackId) => {
      queryClient.setQueriesData<Record<string, boolean>>(
        { queryKey: ['tracks', 'savedStatus'], exact: false },
        (prev) => {
          if (!prev) return prev;
          return { ...prev, [trackId]: false };
        }
      );

      queryClient.refetchQueries({
        predicate: (query) =>
          query.queryKey[0] === 'tracks' &&
          query.queryKey[1] === 'savedStatus' &&
          Array.isArray(query.queryKey[2]) &&
          query.queryKey[2].includes(trackId),
      });

      queryClient.invalidateQueries({ queryKey: ['userSavedTracks'] });
    },
  });
};
