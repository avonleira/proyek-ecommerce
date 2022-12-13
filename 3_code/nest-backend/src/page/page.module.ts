import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageProp } from 'src/typeorm/entities/PageProp';
import { Product } from 'src/typeorm/entities/Product';
import { PageController } from './controllers/page/page.controller';
import { PageService } from './services/page/page.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageProp, Product])],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {}
