import axiosInstance from '../axios';
import axios from 'axios';
import { redirectToSpotifyLogin } from '../auth/login';
import { Category } from '@spotify/web-api-ts-sdk';

type SpotifyBrowseCategoriesResponse = {
  categories: {
    items: Category[];
  };
};

export const getBrowseCategories = async (
  limit = 10
): Promise<Category[]> => {
  try {
    const { data } = await axiosInstance.get<SpotifyBrowseCategoriesResponse>(
      '/browse/categories',
      { params: { limit } }
    );

    if (!data?.categories?.items || !Array.isArray(data.categories.items)) {
      throw new Error('Invalid browse categories response');
    }

    return data.categories.items;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      sessionStorage.removeItem('spotify_access_token');
      redirectToSpotifyLogin();
    }

    throw new Error(
      axios.isAxiosError(error)
        ? error.message || 'Failed to fetch browse categories'
        : 'Unexpected error fetching browse categories'
    );
  }
};