import axios from 'axios';
import { Artist, Track } from '@spotify/web-api-ts-sdk';
import axiosInstance from '../axios';
import { redirectToSpotifyLogin } from '../auth/login';

export const getUserArtists = async (
  limit = 20
): Promise<Artist[]> => {
  try {
    const { data } = await axiosInstance.get<{ artists: { items: Artist[] } }>(
      '/me/following',
      {
        params: { type: 'artist', limit },
      }
    );

    if (!data?.artists?.items || !Array.isArray(data.artists.items)) {
      throw new Error('Invalid followed artists response');
    }

    return data.artists.items;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to fetch followed artists'
        : 'Unexpected error fetching followed artists'
    );
  }
};

export const getArtistById = async (
  artistId: string
): Promise<Artist> => {
  try {
    const { data } = await axiosInstance.get<Artist>(`/artists/${artistId}`);

    if (!data?.id || !data?.name) {
      throw new Error('Invalid artist response');
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to fetch artist'
        : 'Unexpected error fetching artist'
    );
  }
};

export const checkIfFollowingArtist = async (
  artistIds: string[]
): Promise<boolean[]> => {
  try {
    const idsParam = artistIds.join(',');
    const { data } = await axiosInstance.get<boolean[]>(
      '/me/following/contains',
      {
        params: {
          type: 'artist',
          ids: idsParam,
        },
      }
    );

    if (!Array.isArray(data)) {
      throw new Error('Invalid response format from Spotify API');
    }

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        sessionStorage.removeItem('spotify_access_token');
        redirectToSpotifyLogin();
      }
      throw new Error(error.message || 'Failed to check following status');
    }

    throw new Error('Unexpected error checking following status');
  }
};

export const followArtists = async (artistIds: string[]): Promise<boolean> => {
  try {
    const { status } = await axiosInstance.put(
      '/me/following',
      { ids: artistIds },
      {
        params: { type: 'artist' },
      }
    );

    return status === 204;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to follow artist(s)'
        : 'Unexpected error following artist(s)'
    );
  }
};

export const unfollowArtists = async (artistIds: string[]): Promise<boolean> => {
  try {
    const { status } = await axiosInstance.delete('/me/following', {
      params: {
        type: 'artist',
        ids: artistIds.join(','),
      },
    });

    return status === 204;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to unfollow artist(s)'
        : 'Unexpected error unfollowing artist(s)'
    );
  }
};

export const getArtistTopTracks = async (
  artistId: string
): Promise<Track[]> => {
  try {
    const { data, status } = await axiosInstance.get<{ tracks: Track[] }>(
      `/artists/${artistId}/top-tracks`,
      {
        params: {
          market: "US",
        },
      }
    );

    if (status !== 200) {
      throw new Error("Failed to fetch artist top tracks");
    }

    return data.tracks;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem("spotify_access_token");
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || "Failed to fetch artist top tracks"
        : "Unexpected error fetching artist top tracks"
    );
  }
};
