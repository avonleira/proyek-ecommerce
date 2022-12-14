import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/Image';
import { UtilsController } from './utils.controller';
import { UtilsService } from './utils.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Image
    ]),
    HttpModule
  ],
  controllers: [UtilsController],
  providers: [UtilsService]
})
export class UtilsModule {}
