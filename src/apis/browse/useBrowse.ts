import { useQuery } from '@tanstack/react-query';
import { getBrowseCategories } from './browse';
import { Category } from '@spotify/web-api-ts-sdk';

export function useBrowseCategories(limit = 10, enabled = true) {
  return useQuery<Category[]>({
    queryKey: ['browseCategories', limit],
    queryFn: () => getBrowseCategories(limit),
    enabled,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}