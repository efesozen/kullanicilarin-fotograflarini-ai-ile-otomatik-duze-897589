import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Photo } from '@saas-template/database';
import type { CreatePhotoDto, UpdatePhotoDto } from '@saas-template/core';

@Injectable()
export class PhotosRepository extends Repository<Photo> {
  constructor(private dataSource: DataSource) {
    super(Photo, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Photo[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Photo | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreatePhotoDto): Promise<Photo> {
    const photo = this.create({
      ...dto,
      userId,
    });
    return this.save(photo);
  }

  async update(id: string, userId: string, dto: UpdatePhotoDto): Promise<Photo | null> {
    const photo = await this.findById(id, userId);
    if (!photo) {
      return null;
    }

    Object.assign(photo, dto);
    return this.save(photo);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const photo = await this.findById(id, userId);
    if (!photo) {
      return false;
    }

    await this.softRemove(photo);
    return true;
  }
}
