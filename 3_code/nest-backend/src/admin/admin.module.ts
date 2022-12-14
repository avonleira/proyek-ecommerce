import { Module } from '@nestjs/common';
import { ProductController } from './master/product/product.controller';
import { ProductService } from './master/product/product.service';
import { FaqController } from './master/faq/faq.controller';
import { FaqService } from './master/faq/faq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from 'src/typeorm/entities/Faq';
import { Product } from 'src/typeorm/entities/Product';
import { ProductOption } from 'src/typeorm/entities/ProductOption';
import { ProductOptionValue } from 'src/typeorm/entities/ProductOptionValue';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
import { Image } from 'src/typeorm/entities/Image';
import { ProductCategoryController } from './master/product_category/product_category.controller';
import { ProductCategoryService } from './master/product_category/product_category.service';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { ProductOptionController } from './master/product_option/product_option.controller';
import { ProductOptionService } from './master/product_option/product_option.service';
import { PromoController } from './master/promo/promo.controller';
import { PromoService } from './master/promo/promo.service';
import { Promo } from 'src/typeorm/entities/Promo';

@Module({
  imports: [TypeOrmModule.forFeature([
    Faq,
    Product,
    ProductOption,
    ProductOptionValue,
    ProductInventory,
    ProductCategory,
    Image,
    Promo
  ])],
  controllers: [ProductController, FaqController, ProductCategoryController, ProductOptionController, PromoController],
  providers: [ProductService, FaqService, ProductCategoryService, ProductOptionService, PromoService],
})
export class AdminModule {}
