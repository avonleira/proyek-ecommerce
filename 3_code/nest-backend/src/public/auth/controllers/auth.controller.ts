import { Controller, Post, Get, UseGuards, ValidationPipe, UsePipes, Body, UseInterceptors, ClassSerializerInterceptor, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
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

  @Get("coba")
  async coba(@Req() req: Request) {
    console.log(req.cookies)
    return 0;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res({passthrough: true}) response: Response, @Req() req: Request) {
    const result = await this.authService.login(loginDto)
    if (result) {
      response.cookie('ref_tok', result.ref_tok, { httpOnly: true, domain: process.env.FRONTEND_DOMAIN, maxAge: 86400000 });
    }
    return new GeneralSerialization(result);
  }

  @Post('refresh')
  async refresh(@Req() req: Request, @Res({passthrough: true}) response: Response) {
    const result = await this.authService.refresh(req.cookies['ref_tok'])
    if (result) {
      response.cookie('ref_tok', result.ref_tok, { httpOnly: true, domain: process.env.FRONTEND_DOMAIN, maxAge: 86400000 });
    }
    return new GeneralSerialization(result);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res({passthrough: true}) response: Response) {
    const result = await this.authService.register(registerDto)
    if (result) {
      response.cookie('ref_tok', result.ref_tok, { httpOnly: true, domain: process.env.FRONTEND_DOMAIN, maxAge: 86400000 });
    }
    return new GeneralSerialization(result);
  }

  @UseGuards(JwtAuthGuard)
  @Get('logout')
  logout(@Res({passthrough: true}) response) {
    response.cookie('ref_tok', null, {httpOnly: true, domain: process.env.FRONTEND_DOMAIN, maxAge: 1});
    return {message: "logged out"}
  }

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req) {
    return req.user;
  }
}
