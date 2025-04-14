import axiosInstance from '../axios';
import axios from 'axios';
import { SavedAlbum, Album } from '@spotify/web-api-ts-sdk';
import { redirectToSpotifyLogin } from '../auth/login';

export const getUserSavedAlbums = async (
  limit = 20,
  offset = 0
): Promise<SavedAlbum[]> => {
  try {
    const { data } = await axiosInstance.get<{ items: SavedAlbum[] }>(
      `/me/albums?limit=${limit}&offset=${offset}`
    );

    if (!data || !Array.isArray(data.items)) {
      throw new Error('Invalid saved albums data');
    }

    return data.items;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw error;
  }
};

export const getAlbumsByArtistId = async (
  artistId: string,
  limit = 20
): Promise<Album[]> => {
  try {
    const { data, status } = await axiosInstance.get<{ items: Album[] }>(
      `/artists/${artistId}/albums`,
      {
        params: {
          limit,
          include_groups: "album,single",
        },
      }
    );

    if (status !== 200) {
      throw new Error("Failed to fetch artist albums");
    }

    return data.items;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem("spotify_access_token");
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || "Failed to fetch artist albums"
        : "Unexpected error fetching artist albums"
    );
  }
};

export const getAlbumById = async (albumId: string): Promise<Album> => {
  try {
    const { data, status } = await axiosInstance.get<Album>(
      `/albums/${albumId}`
    );

    if (status !== 200) {
      throw new Error("Failed to fetch album");
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem("spotify_access_token");
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || "Failed to fetch album"
        : "Unexpected error fetching album"
    );
  }
};
