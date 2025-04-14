import { useQuery } from '@tanstack/react-query';
import { getUserAudiobooks } from './audiobooks';
import { Audiobook } from '@spotify/web-api-ts-sdk';

export function useUserAudiobooks(enabled: boolean) {
  return useQuery<Audiobook[]>({
    queryKey: ['userAudiobooks'],
    queryFn: getUserAudiobooks,
    enabled,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
}
