import { api } from '@/lib/api';
import type { SubscriptionplanResponseDto, CreateSubscriptionplanDto, UpdateSubscriptionplanDto } from '@saas-template/core';

export const subscriptionplansService = {
  async getAll(): Promise<SubscriptionplanResponseDto[]> {
    const response = await api.get('/subscriptionplans');
    return response.data;
  },

  async getById(id: string): Promise<SubscriptionplanResponseDto> {
    const response = await api.get(`/subscriptionplans/${id}`);
    return response.data;
  },

  async create(data: CreateSubscriptionplanDto): Promise<SubscriptionplanResponseDto> {
    const response = await api.post('/subscriptionplans', data);
    return response.data;
  },

  async update(id: string, data: UpdateSubscriptionplanDto): Promise<SubscriptionplanResponseDto> {
    const response = await api.put(`/subscriptionplans/${id}`, data);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/subscriptionplans/${id}`);
  },
};
