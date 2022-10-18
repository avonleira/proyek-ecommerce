import { Param, Body, Controller, Get, Post, Put, UsePipes, ValidationPipe, ParseIntPipe, BadRequestException, NotImplementedException, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor, UseGuards, Request } from '@nestjs/common';
import { UpdateUserDto } from 'src/account/dtos/UpdateUser.dto';
import { SerializedProfile } from 'src/account/serialization/SerializedProfile';
import { AccountService } from 'src/account/services/account/account.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('account')
export class AccountController {

  constructor(private accountService: AccountService) {

  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getProfileData(@Request() req) {
    const profile = await this.accountService.getUserProfile(req.user.id);
    if (profile)
      return new SerializedProfile(profile);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put()
  async updateAccount(@Request() req, @Body() updateUserDto : UpdateUserDto) {
    const account = await this.accountService.updateUserProfile(req.user.id, updateUserDto);
    if (account)
      return new SerializedProfile(account)
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete()
  async deleteAccount(@Request() req) {
    const account = await this.accountService.deleteAccount(req.user.id);
    if (account)
      return new SerializedProfile(account)
  }
}
