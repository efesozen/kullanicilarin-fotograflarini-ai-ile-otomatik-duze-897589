import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateSubscriptionplanDto, SubscriptionplanResponseDto, UpdateSubscriptionplanDto } from '@saas-template/core';
import type { Subscriptionplan } from '@saas-template/database';
import { SubscriptionplansRepository } from './subscriptionplans.repository';

@Injectable()
export class SubscriptionplansService {
  constructor(
    private readonly subscriptionplansRepository: SubscriptionplansRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<SubscriptionplanResponseDto[]> {
    const subscriptionplans = await this.subscriptionplansRepository.findAll(userId);
    return subscriptionplans.map((subscriptionplan: Subscriptionplan) => this.toResponseDto(subscriptionplan));
  }

  async findOne(id: string, userId: string): Promise<SubscriptionplanResponseDto> {
    const subscriptionplan = await this.subscriptionplansRepository.findById(id, userId);
    if (!subscriptionplan) {
      throw new NotFoundException('Subscriptionplan not found');
    }
    return this.toResponseDto(subscriptionplan);
  }

  async create(userId: string, dto: CreateSubscriptionplanDto): Promise<SubscriptionplanResponseDto> {
    return this.uow.execute(async () => {
      const subscriptionplan = await this.subscriptionplansRepository.create(userId, dto);
      return this.toResponseDto(subscriptionplan);
    });
  }

  async update(id: string, userId: string, dto: UpdateSubscriptionplanDto): Promise<SubscriptionplanResponseDto> {
    return this.uow.execute(async () => {
      const subscriptionplan = await this.subscriptionplansRepository.update(id, userId, dto);
      if (!subscriptionplan) {
        throw new NotFoundException('Subscriptionplan not found');
      }
      return this.toResponseDto(subscriptionplan);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.subscriptionplansRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Subscriptionplan not found');
      }
    });
  }

  private toResponseDto(subscriptionplan: Subscriptionplan): SubscriptionplanResponseDto {
    return {
      id: subscriptionplan.id,
      name: subscriptionplan.name,
      price: subscriptionplan.price,
      duration_months: subscriptionplan.duration_months,
      features: subscriptionplan.features,
      createdAt: subscriptionplan.createdAt,
      updatedAt: subscriptionplan.updatedAt,
    };
  }
}
