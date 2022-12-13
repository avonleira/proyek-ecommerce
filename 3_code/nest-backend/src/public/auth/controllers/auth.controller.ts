import { Controller, Post, Get, Request, UseGuards, ValidationPipe, UsePipes, Body, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { LoginDto } from '../dtos/Login.dto';
import { RegisterDto } from '../dtos/Register.dto';
import { JwtAuthGuard } from '../jwt-auth.guard';
import { SerializedRegister } from '../serialization/SerializedRegister';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {

  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto) {
    return new SerializedRegister(await this.authService.register(registerDto));
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Request() req) {
    return req.user;
  }
}
