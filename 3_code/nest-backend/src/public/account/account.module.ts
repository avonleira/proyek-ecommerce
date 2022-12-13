import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserAddress } from 'src/typeorm/entities/UserAddress';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';
import { MulterModule } from '@nestjs/platform-express';
import { Cart } from 'src/typeorm/entities/Cart';
import { ProductService } from 'src/admin/master/product/product.service';
import { Product } from 'src/typeorm/entities/Product';
import { AdminModule } from 'src/admin/admin.module';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { ProductOption } from 'src/typeorm/entities/ProductOption';
import { ProductOptionValue } from 'src/typeorm/entities/ProductOptionValue';
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
