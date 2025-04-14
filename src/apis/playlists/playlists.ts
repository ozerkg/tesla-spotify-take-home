import axiosInstance from '../axios'; // your custom axios instance
import axios from 'axios'; // for isAxiosError
import { Playlist } from '@spotify/web-api-ts-sdk';
import { redirectToSpotifyLogin } from '../auth/login';

export const getUserPlaylists = async (
  limit = 20,
  offset = 0
): Promise<Playlist[]> => {
  try {
    const { data } = await axiosInstance.get<{ items: Playlist[] }>(
      `/me/playlists?limit=${limit}&offset=${offset}`
    );

    if (!data || !Array.isArray(data.items)) {
      throw new Error('Invalid playlists data');
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

export const getPlaylistById = async (
  playlistId: string
): Promise<Playlist> => {
  try {
    const { data, status } = await axiosInstance.get<Playlist>(
      `/playlists/${playlistId}`
    );

    if (status !== 200) {
      throw new Error("Failed to fetch playlist details");
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem("spotify_access_token");
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || "Failed to fetch playlist details"
        : "Unexpected error fetching playlist details"
    );
  }
};