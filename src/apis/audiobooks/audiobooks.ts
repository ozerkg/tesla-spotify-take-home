import axiosInstance from '../axios';
import axios from 'axios';
import { Audiobook } from '@spotify/web-api-ts-sdk';
import { redirectToSpotifyLogin } from '../auth/login';

type GetUserAudiobooksResponse = {
  items: Audiobook[];
};

export const getUserAudiobooks = async (): Promise<Audiobook[]> => {
  try {
    const { data } = await axiosInstance.get<GetUserAudiobooksResponse>(
      '/me/audiobooks'
    );

    if (!data?.items || !Array.isArray(data.items)) {
      throw new Error('Invalid audiobook data');
    }

    return data.items;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to fetch user audiobooks'
        : 'Unexpected error fetching user audiobooks'
    );
  }
};
