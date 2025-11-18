import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreatePhotoDto, PhotoResponseDto, UpdatePhotoDto } from '@saas-template/core';
import type { Photo } from '@saas-template/database';
import { PhotosRepository } from './photos.repository';

@Injectable()
export class PhotosService {
  constructor(
    private readonly photosRepository: PhotosRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<PhotoResponseDto[]> {
    const photos = await this.photosRepository.findAll(userId);
    return photos.map((photo: Photo) => this.toResponseDto(photo));
  }

  async findOne(id: string, userId: string): Promise<PhotoResponseDto> {
    const photo = await this.photosRepository.findById(id, userId);
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    return this.toResponseDto(photo);
  }

  async create(userId: string, dto: CreatePhotoDto): Promise<PhotoResponseDto> {
    return this.uow.execute(async () => {
      const photo = await this.photosRepository.create(userId, dto);
      return this.toResponseDto(photo);
    });
  }

  async update(id: string, userId: string, dto: UpdatePhotoDto): Promise<PhotoResponseDto> {
    return this.uow.execute(async () => {
      const photo = await this.photosRepository.update(id, userId, dto);
      if (!photo) {
        throw new NotFoundException('Photo not found');
      }
      return this.toResponseDto(photo);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.photosRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Photo not found');
      }
    });
  }

  private toResponseDto(photo: Photo): PhotoResponseDto {
    return {
      id: photo.id,
      userId: photo.userId,
      url: photo.url,
      enhancements: photo.enhancements,
      filters: photo.filters,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
    };
  }
}
