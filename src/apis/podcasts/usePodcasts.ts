import { useQuery } from '@tanstack/react-query';
import { getPodcasts } from './podcasts';
import { Show } from '@spotify/web-api-ts-sdk';

export function useUserPodcasts(enabled: boolean) {
  return useQuery<Show[]>({
    queryKey: ['userPodcasts'],
    queryFn: getPodcasts,
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
