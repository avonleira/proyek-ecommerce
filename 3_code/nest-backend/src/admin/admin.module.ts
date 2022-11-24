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

@Module({
  imports: [TypeOrmModule.forFeature([Faq, Product, ProductOption, ProductOptionValue, ProductInventory])],
  exports: [ProductService],
  controllers: [ProductController, FaqController],
  providers: [ProductService, FaqService]
})
export class AdminModule {}
