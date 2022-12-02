import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/Image';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';

@Module({
  imports: [TypeOrmModule.forFeature([
    Image
  ])],
  controllers: [UtilsController],
  providers: [UtilsService]
})
export class UtilsModule {}
