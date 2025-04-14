import axiosInstance from '../axios';
import axios from 'axios';
import { Show } from '@spotify/web-api-ts-sdk';
import { redirectToSpotifyLogin } from '../auth/login';

type GetUserShowsResponse = {
  items: {
    show: Show;
    added_at: string;
  }[];
};

export const getPodcasts = async (): Promise<Show[]> => {
  try {
    const { data } = await axiosInstance.get<GetUserShowsResponse>('/me/shows');

    if (!data?.items || !Array.isArray(data.items)) {
      throw new Error('Invalid podcast data');
    }

    const podcasts: Show[] = data.items.map((item) => item.show);
    return podcasts;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to fetch user podcasts'
        : 'Unexpected error fetching user podcasts'
    );
  }
};
