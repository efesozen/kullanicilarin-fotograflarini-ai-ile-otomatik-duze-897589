import { api } from '@/lib/api';
import type { PhotoResponseDto, CreatePhotoDto, UpdatePhotoDto } from '@saas-template/core';

export const photosService = {
  async getAll(): Promise<PhotoResponseDto[]> {
    const response = await api.get('/photos');
    return response.data;
  },

  async getById(id: string): Promise<PhotoResponseDto> {
    const response = await api.get(`/photos/${id}`);
    return response.data;
  },

  async create(data: CreatePhotoDto): Promise<PhotoResponseDto> {
    const response = await api.post('/photos', data);
    return response.data;
  },

  async update(id: string, data: UpdatePhotoDto): Promise<PhotoResponseDto> {
    const response = await api.put(`/photos/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/photos/${id}`);
  },
};
