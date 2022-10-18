import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { UserAddress } from 'src/typeorm/entities/UserAddress';
import { AccountController } from './controllers/account/account.controller';
import { AccountService } from './services/account/account.service';
@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress])],
  controllers: [AccountController],
  providers: [AccountService]
})
export class AccountModule {}
