import { useQuery } from '@tanstack/react-query';
import { getUserSavedAlbums, getAlbumsByArtistId, getAlbumById } from './albums';
import { SavedAlbum, Album } from '@spotify/web-api-ts-sdk';

export function useUserSavedAlbums(limit = 20, offset = 0, enabled = true) {
  return useQuery<SavedAlbum[]>({
    queryKey: ['userAlbums'],
    queryFn: () => getUserSavedAlbums(limit, offset),
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}

export const useArtistAlbums = (
  artistId: string,
  limit = 20,
  enabled = true
) => {
  return useQuery<Album[]>({
    queryKey: ["artistAlbums", artistId, limit],
    queryFn: () => getAlbumsByArtistId(artistId, limit),
    enabled: enabled && !!artistId,
    staleTime: 1000 * 60 * 5,
  });
};

export const useAlbumById = (albumId: string, enabled = true) => {
  return useQuery<Album>({
    queryKey: ["album", albumId],
    queryFn: () => getAlbumById(albumId),
    enabled: enabled && !!albumId,
    staleTime: 1000 * 60 * 5,
  });
};