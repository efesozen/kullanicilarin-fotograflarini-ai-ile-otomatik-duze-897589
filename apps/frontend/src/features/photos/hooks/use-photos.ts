import type { CreatePhotoDto, UpdatePhotoDto } from '@saas-template/core';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { photosService } from '../services';

const PHOTO_KEY = ['photos'];

export function usePhotos() {
  return useQuery({
    queryKey: PHOTO_KEY,
    queryFn: () => photosService.getAll(),
  });
}

export function usePhoto(id: string) {
  return useQuery({
    queryKey: [...PHOTO_KEY, id],
    queryFn: () => photosService.getById(id),
    enabled: !!id,
  });
}

export function useCreatePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePhotoDto) => photosService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTO_KEY });
    },
  });
}

export function useUpdatePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePhotoDto }) =>
      photosService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTO_KEY });
    },
  });
}

export function useDeletePhoto() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => photosService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHOTO_KEY });
    },
  });
}
