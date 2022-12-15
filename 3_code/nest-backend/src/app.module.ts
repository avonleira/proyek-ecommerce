import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { UsersModule } from './users/users.module';
import { AuthModule } from './public/auth/auth.module';
import { AccountModule } from './public/account/account.module';
import { UtilsModule } from './public/utils/utils.module';
import { AdminModule } from './admin/admin.module';
import { PageModule } from './page/page.module';

import { User } from './typeorm/entities/User';
import { UserAddress } from './typeorm/entities/UserAddress';
import { Product } from './typeorm/entities/Product';
import { ProductOption } from './typeorm/entities/ProductOption';
import { ProductOptionValue } from './typeorm/entities/ProductOptionValue';
import { ProductInventory } from './typeorm/entities/ProductInventory';
import { Faq } from './typeorm/entities/Faq';
import { PageProp } from './typeorm/entities/PageProp';
import { Image } from './typeorm/entities/Image';
import { ProductCategory } from './typeorm/entities/ProductCategory';
import { Cart } from './typeorm/entities/Cart';
import { Promo } from './typeorm/entities/Promo';
import { Etalase } from './typeorm/entities/Etalase';
import { Tag } from './typeorm/entities/Tag';
import { Wishlist } from './typeorm/entities/Wishlist';
import { MidtransService } from './services/midtrans/service/midtrans/midtrans.service';
import { MidtransController } from './services/midtrans/controller/midtrans/midtrans.controller';
import { Htrans } from './typeorm/entities/Htrans';
import { Dtrans } from './typeorm/entities/Dtrans';
import { Review } from './typeorm/entities/Review';
import { PreCheckout } from './typeorm/entities/PreCheckout';
import { Connection } from 'typeorm';
import { ProductView } from './typeorm/entities/ProductView';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: `${process.env.DB_HOST}`,
      port: Number(process.env.DB_PORT),
      username: `${process.env.DB_USERNAME}`,
      password: `${process.env.DB_PASSWORD}`,
      database: `${process.env.DB_NAME}`,
      entities: [
        User,
        UserAddress,
        Product,
        ProductOption,
        ProductOptionValue,
        ProductInventory,
        ProductCategory,
        Faq,
        PageProp,
        Image,
        Cart,
        Promo,
        Etalase,
        Tag,
        Wishlist,
        Htrans,
        Dtrans,
        Review,
        PreCheckout,
        ProductView
      ],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([
      Product,
      ProductInventory,
    ]),
    UsersModule,
    AccountModule,
    AuthModule,
    AdminModule,
    PageModule,
    UtilsModule
  ],
  controllers: [AppController, MidtransController],
  providers: [AppService, MidtransService]
})
export class AppModule {}
