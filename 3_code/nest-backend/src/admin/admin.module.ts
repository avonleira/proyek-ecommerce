import { Module } from '@nestjs/common';
import { ProductController } from './master/product/product.controller';
import { ProductService } from './master/product/product.service';
import { FaqController } from './master/faq/faq.controller';
import { FaqService } from './master/faq/faq.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Faq } from 'src/typeorm/entities/Faq';
import { Product } from 'src/typeorm/entities/Product';

@Module({
  imports: [TypeOrmModule.forFeature([Faq, Product])],
  controllers: [ProductController, FaqController],
  providers: [ProductService, FaqService]
})
export class AdminModule {}
