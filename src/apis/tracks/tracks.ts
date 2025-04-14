import axiosInstance from '../axios'; // your custom axios instance
import axios from 'axios'; // import the real axios for `isAxiosError`
import { Track, PlayHistory, RecentlyPlayedTracksPage } from '@spotify/web-api-ts-sdk';
import { redirectToSpotifyLogin } from '../auth/login';

export const getTopTracks = async (): Promise<Track[]> => {
  try {
    const { data } = await axiosInstance.get<{ items: Track[] }>('/me/top/tracks');
    
    if (!data || !Array.isArray(data.items)) {
      throw new Error('Invalid top tracks data');
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

export const getRecentlyPlayedTracks = async (
  limit = 10
): Promise<PlayHistory[]> => {
  try {
    const { data } = await axiosInstance.get<RecentlyPlayedTracksPage>(
      `/me/player/recently-played`,
      {
        params: { limit },
      }
    );

    if (!data || !Array.isArray(data.items)) {
      throw new Error('Invalid recently played data');
    }

    return data.items;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to fetch recently played tracks'
        : 'Unexpected error fetching recently played tracks'
    );
  }
};

export const checkIfTrackIsSaved = async (
  trackIds: string[]
): Promise<boolean[]> => {
  try {
    const { data, status } = await axiosInstance.get<boolean[]>(
      "/me/tracks/contains",
      {
        params: {
          ids: trackIds.join(","),
        },
      }
    );

    if (status !== 200) {
      throw new Error("Failed to check if tracks are saved");
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem("spotify_access_token");
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || "Failed to check if tracks are saved"
        : "Unexpected error checking track saved status"
    );
  }
};

export interface SavedTrackItem {
  added_at: string;
  track: Track;
}

export const getUserSavedTracks = async (
  limit = 50,
  offset = 0
): Promise<Track[]> => {
  try {
    const { data, status } = await axiosInstance.get<{ items: SavedTrackItem[] }>(
      "/me/tracks",
      {
        params: {
          limit,
          offset,
        },
      }
    );

    if (status !== 200) {
      throw new Error("Failed to fetch saved tracks");
    }

    const tracks: Track[] = data.items.map((item) => item.track);
    return tracks;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem("spotify_access_token");
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || "Failed to fetch saved tracks"
        : "Unexpected error fetching saved tracks"
    );
  }
};

export const saveTracks = async (trackIds: string[]): Promise<void> => {
  try {
    const response = await axiosInstance.put(
      '/me/tracks',
      { ids: trackIds },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status !== 200) {
      throw new Error('Failed to save tracks');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to save tracks'
        : 'Unexpected error saving tracks'
    );
  }
};

export const unsaveTracks = async (trackIds: string[]): Promise<void> => {
  try {
    const response = await axiosInstance.delete('/me/tracks', {
      data: { ids: trackIds },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to unsave tracks');
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to unsave tracks'
        : 'Unexpected error unsaving tracks'
    );
  }
};