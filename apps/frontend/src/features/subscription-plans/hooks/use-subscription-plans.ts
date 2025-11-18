import type { CreateSubscriptionplanDto, UpdateSubscriptionplanDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { subscriptionplansService } from '../services';

const SUBSCRIPTIONPLAN_KEY = ['subscriptionplans'];

export function useSubscriptionplans() {
  return useQuery({
    queryKey: SUBSCRIPTIONPLAN_KEY,
    queryFn: () => subscriptionplansService.getAll(),
  });
}

export function useSubscriptionplan(id: string) {
  return useQuery({
    queryKey: [...SUBSCRIPTIONPLAN_KEY, id],
    queryFn: () => subscriptionplansService.getById(id),
    enabled: !!id,
  });
}

export function useCreateSubscriptionplan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSubscriptionplanDto) => subscriptionplansService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTIONPLAN_KEY });
    },
  });
}

export function useUpdateSubscriptionplan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSubscriptionplanDto }) =>
      subscriptionplansService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTIONPLAN_KEY });
    },
  });
}

export function useDeleteSubscriptionplan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => subscriptionplansService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SUBSCRIPTIONPLAN_KEY });
    },
  });
}
