import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeorm/entities/User';
import { UserAddress } from './typeorm/entities/UserAddress';
import { UsersModule } from './users/users.module';
import { AccountModule } from './public/account/account.module';
import { AuthModule } from './public/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { Product } from './typeorm/entities/Product';
import { ProductOption } from './typeorm/entities/ProductOption';
import { ProductOptionValue } from './typeorm/entities/ProductOptionValue';
import { ProductInventory } from './typeorm/entities/ProductInventory';
import { AdminModule } from './admin/admin.module';
import { Faq } from './typeorm/entities/Faq';
import { PageProp } from './typeorm/entities/PageProp';
import { PageModule } from './page/page.module';
import { Image } from './typeorm/entities/Image';
import { ProductCategory } from './typeorm/entities/ProductCategory';
import { UtilsModule } from './public/utils/utils.module';
import { Cart } from './typeorm/entities/Cart';

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
      ],
      synchronize: true,
    }), 
    UsersModule,
    AccountModule,
    AuthModule,
    AdminModule,
    PageModule,
    UtilsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
