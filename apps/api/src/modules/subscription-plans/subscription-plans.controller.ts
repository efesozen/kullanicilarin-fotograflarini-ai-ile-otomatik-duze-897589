import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import type { CreateSubscriptionplanDto, SubscriptionplanResponseDto, UpdateSubscriptionplanDto } from '@saas-template/core';
import type { User } from '@saas-template/database';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { SubscriptionplansService } from './subscriptionplans.service';

@Controller('subscriptionplans')
@UseGuards(JwtAuthGuard)
export class SubscriptionplansController {
  constructor(private readonly subscriptionplansService: SubscriptionplansService) {}

  @Get()
  async findAll(@CurrentUser() user: User): Promise<SubscriptionplanResponseDto[]> {
    return this.subscriptionplansService.findAll(user.id);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: User): Promise<SubscriptionplanResponseDto> {
    return this.subscriptionplansService.findOne(id, user.id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() dto: CreateSubscriptionplanDto,
    @CurrentUser() user: User
  ): Promise<SubscriptionplanResponseDto> {
    return this.subscriptionplansService.create(user.id, dto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateSubscriptionplanDto,
    @CurrentUser() user: User
  ): Promise<SubscriptionplanResponseDto> {
    return this.subscriptionplansService.update(id, user.id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @CurrentUser() user: User): Promise<void> {
    return this.subscriptionplansService.remove(id, user.id);
  }
}
