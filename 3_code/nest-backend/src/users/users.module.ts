import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from '../typeorm/entities/User';
import { UserAddress } from '../typeorm/entities/UserAddress';
import { UsersController } from './controller/users/users.controller';
import { UsersService } from './services/users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserAddress])],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
