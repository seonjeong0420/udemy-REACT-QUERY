import type { Appointment } from '@shared/types';
import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { useLoginData } from '@/auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { UserAppointments } from '../UserAppointments';
import { generateAppointKey } from '@/react-query/key-factories';

// for when we need a query function for useQuery
async function getUserAppointments(userId: number, userToken: string): Promise<Appointment[] | null> {
  const { data } = await axiosInstance.get(`/user/${userId}/appointments`, {
    headers: getJWTHeader(userToken),
  });
  return data.appointments;
}

export function useUserAppointments(): Appointment[] {
  // TODO replace with React Query
  const { userId, userToken } = useLoginData();
  const fallback: Appointment[] = [];
  const { data: useUserAppointments = fallback } = useQuery({
    enabled: !!userId,
    queryKey: generateAppointKey(userId, userToken),
    queryFn: () => getUserAppointments(userId, userToken),
  });

  return useUserAppointments;
}
