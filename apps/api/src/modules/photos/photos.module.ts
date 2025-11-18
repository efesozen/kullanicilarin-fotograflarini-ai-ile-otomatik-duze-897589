import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { PhotosRepository } from './photos.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo]),
    DatabaseModule,
  ],
  controllers: [PhotosController],
  providers: [PhotosService, PhotosRepository],
  exports: [PhotosService],
})
export class PhotosModule {}
