import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserAddress } from 'src/typeorm/entities/UserAddress';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';
import { MulterModule } from '@nestjs/platform-express';
@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserAddress]),
    MulterModule.register({
      dest: './uploads/accounts',
    }),
  ],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
