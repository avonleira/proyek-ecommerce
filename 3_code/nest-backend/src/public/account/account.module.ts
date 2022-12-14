import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';

import { User } from '../../typeorm/entities/User';
import { UserAddress } from '../../typeorm/entities/UserAddress';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';
import { Cart } from '../../typeorm/entities/Cart';
import { ProductService } from '../../admin/master/product/product.service';
import { Product } from '../../typeorm/entities/Product';
import { AdminModule } from '../../admin/admin.module';
import { ProductInventory } from '../../typeorm/entities/ProductInventory';
import { ProductCategory } from '../../typeorm/entities/ProductCategory';
import { ProductOption } from '../../typeorm/entities/ProductOption';
import { ProductOptionValue } from '../../typeorm/entities/ProductOptionValue';
@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      UserAddress,
      Cart,
      Product,
      ProductInventory,
      ProductCategory,
      ProductOption,
      ProductOptionValue,
    ]),
    MulterModule.register({
      dest: './uploads/accounts',
    })
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
