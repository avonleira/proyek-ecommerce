import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dtrans } from 'src/typeorm/entities/Dtrans';
import { Etalase } from 'src/typeorm/entities/Etalase';
import { Htrans } from 'src/typeorm/entities/Htrans';
import { PageProp } from 'src/typeorm/entities/PageProp';
import { Product } from 'src/typeorm/entities/Product';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
import { ProductView } from 'src/typeorm/entities/ProductView';
import { Review } from 'src/typeorm/entities/Review';
import { Tag } from 'src/typeorm/entities/Tag';
import { PageController } from './controllers/page/page.controller';
import { PageService } from './services/page/page.service';

@Module({
  imports: [TypeOrmModule.forFeature([PageProp, Product, ProductCategory, Etalase, Tag, ProductView, Review, Dtrans, Htrans, ProductInventory])],
  controllers: [PageController],
  providers: [PageService]
})
export class PageModule {}
