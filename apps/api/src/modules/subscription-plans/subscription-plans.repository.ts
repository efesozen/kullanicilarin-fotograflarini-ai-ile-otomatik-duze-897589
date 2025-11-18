import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Subscriptionplan } from '@saas-template/database';
import type { CreateSubscriptionplanDto, UpdateSubscriptionplanDto } from '@saas-template/core';

@Injectable()
export class SubscriptionplansRepository extends Repository<Subscriptionplan> {
  constructor(private dataSource: DataSource) {
    super(Subscriptionplan, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Subscriptionplan[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Subscriptionplan | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateSubscriptionplanDto): Promise<Subscriptionplan> {
    const subscriptionplan = this.create({
      ...dto,
      userId,
    });
    return this.save(subscriptionplan);
  }

  async update(id: string, userId: string, dto: UpdateSubscriptionplanDto): Promise<Subscriptionplan | null> {
    const subscriptionplan = await this.findById(id, userId);
    if (!subscriptionplan) {
      return null;
    }

    Object.assign(subscriptionplan, dto);
    return this.save(subscriptionplan);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const subscriptionplan = await this.findById(id, userId);
    if (!subscriptionplan) {
      return false;
    }

    await this.softRemove(subscriptionplan);
    return true;
  }
}
