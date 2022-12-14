import { Controller, Post, Get, UseGuards, ValidationPipe, UsePipes, Body, UseInterceptors, ClassSerializerInterceptor, Res, Req } from '@nestjs/common';
import { Request, response } from 'express';
import { GeneralSerialization } from 'src/general/GeneralSerialization';
import { LoginDto } from '../dtos/Login.dto';
import { RegisterDto } from '../dtos/Register.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { SerializedRegister } from '../serialization/SerializedRegister';
import { AuthService } from '../services/auth.service';

@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe())
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) response, @Req() req: Request) {
    const result = await this.authService.login(loginDto)
    if (result) {
      response.cookie('jwt', result.token, {httpOnly: true, domain: process.env.FRONTEND_DOMAIN,});
    }
    return new GeneralSerialization(result);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    const result = await this.authService.register(registerDto)
    if (result) {
      response.cookie('jwt', result.token, {httpOnly: true, domain: process.env.FRONTEND_DOMAIN,});
    }
    return new GeneralSerialization(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req) {
    return req.user;
  }
}
