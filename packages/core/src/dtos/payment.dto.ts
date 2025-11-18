import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export class CreatePaymentDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  subscriptionPlanId!: string;

  @IsNumber()
  amount!: number;

  @IsDate()
  paymentDate!: Date;

  @IsEnum(PaymentStatus)
  status!: PaymentStatus;
}

export class UpdatePaymentDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsUUID()
  subscriptionPlanId?: string | undefined;

  @IsOptional()
  @IsNumber()
  amount?: number | undefined;

  @IsOptional()
  @IsDate()
  paymentDate?: Date | undefined;

  @IsOptional()
  @IsEnum(PaymentStatus)
  status?: PaymentStatus | undefined;
}

export class PaymentResponseDto {
  id!: string;
  userId!: string;
  subscriptionPlanId!: string;
  amount!: number;
  paymentDate!: Date;
  status!: PaymentStatus;
  createdAt!: Date;
  updatedAt!: Date;
}
