import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/Image';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';
import { HttpModule } from '@nestjs/axios';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image,
      ProductCategory
    ]),
    HttpModule
  ],
  controllers: [UtilsController],
  providers: [UtilsService]
})
export class UtilsModule {}
