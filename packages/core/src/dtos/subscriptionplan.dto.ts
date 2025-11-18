import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateSubscriptionplanDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsNumber()
  price!: number;

  @IsNumber()
  duration_months!: number;

  @IsOptional()
  features?: Record<string, unknown>;
}

export class UpdateSubscriptionplanDto {
  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | undefined;

  @IsOptional()
  @IsNumber()
  price?: number | undefined;

  @IsOptional()
  @IsNumber()
  duration_months?: number | undefined;

  @IsOptional()
  @IsOptional()
  features?: Record<string, unknown> | undefined;
}

export class SubscriptionplanResponseDto {
  id!: string;
  name!: string;
  price!: number;
  duration_months!: number;
  features?: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
