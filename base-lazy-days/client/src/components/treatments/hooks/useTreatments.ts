import type { Treatment } from '@shared/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '@/axiosInstance';
import { queryKeys } from '@/react-query/constants';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
  const { data } = await axiosInstance.get('/treatments');
  return data;
}

export function useTreatments(): Treatment[] {
  const fallback: Treatment[] = [];
  // TODO: get data from server via useQuery
  const { data = fallback } = useQuery({
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    staleTime: 600000, // 10 minutes (10분 동안 데이터 유지)
    gcTime: 900000, // 15 minutes
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return data;
}

export function usePrefetchTreatments(): void {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    // prefetchQuery : 일회성 작업, 단순히 데이터를 가져와 캐시에 저장한 후에 useQuery처럼 모니터링 수행하지 않는다.
    queryKey: [queryKeys.treatments],
    queryFn: getTreatments,
    staleTime: 600000, // 10 minutes (10분 동안 데이터 유지)
    gcTime: 900000, // 15 minutes
  });
}
