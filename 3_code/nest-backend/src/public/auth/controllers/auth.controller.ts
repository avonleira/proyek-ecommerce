import { Controller, Post, Get, Request, UseGuards, ValidationPipe, UsePipes, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
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
  async login(@Body() loginDto: LoginDto) {
    return new GeneralSerialization(await this.authService.login(loginDto));
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return new SerializedRegister(await this.authService.register(registerDto));
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req) {
    return req.user;
  }
}
