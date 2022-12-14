import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Etalase } from 'src/typeorm/entities/Etalase';
import { PageProp } from 'src/typeorm/entities/PageProp';
import { Product } from 'src/typeorm/entities/Product';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { Tag } from 'src/typeorm/entities/Tag';
import { PageController } from './controllers/page/page.controller';
import { PageService } from './services/page/page.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageProp, Product, ProductCategory, Etalase, Tag])],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {}
