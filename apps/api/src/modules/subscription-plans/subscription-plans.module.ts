import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriptionplan } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { SubscriptionplansController } from './subscriptionplans.controller';
import { SubscriptionplansService } from './subscriptionplans.service';
import { SubscriptionplansRepository } from './subscriptionplans.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Subscriptionplan]),
    DatabaseModule,
  ],
  controllers: [SubscriptionplansController],
  providers: [SubscriptionplansService, SubscriptionplansRepository],
  exports: [SubscriptionplansService],
})
export class SubscriptionplansModule {}
