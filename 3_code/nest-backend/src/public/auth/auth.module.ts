import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { User } from '../../typeorm/entities/User';

@Module({
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  imports: [PassportModule,TypeOrmModule.forFeature([User]), JwtModule.register({
    secret: `${process.env.JWT_SECRET}`,
    signOptions: { expiresIn: '1d'}
  })],
  exports: [AuthService, PassportModule]
})
export class AuthModule {}
