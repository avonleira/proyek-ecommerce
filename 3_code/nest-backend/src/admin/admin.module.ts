import { Module } from '@nestjs/common';
import { ProductController } from './master/product/product.controller';
import { ProductService } from './master/product/product.service';
import { FaqController } from './master/faq/faq.controller';
import { FaqService } from './master/faq/faq.service';

@Module({
  controllers: [ProductController, FaqController],
  providers: [ProductService, FaqService]
})
export class AdminModule {}
