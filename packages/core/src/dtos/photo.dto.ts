import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreatePhotoDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  url!: string;

  @IsOptional()
  enhancements?: Record<string, unknown>;

  @IsOptional()
  filters?: Record<string, unknown>;
}

export class UpdatePhotoDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  url?: string | undefined;

  @IsOptional()
  @IsOptional()
  enhancements?: Record<string, unknown> | undefined;

  @IsOptional()
  @IsOptional()
  filters?: Record<string, unknown> | undefined;
}

export class PhotoResponseDto {
  id!: string;
  userId!: string;
  url!: string;
  enhancements?: Record<string, unknown>;
  filters?: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
