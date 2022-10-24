import { Body, Controller, Get, Put, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Request, UploadedFiles, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { UpdateUserDto } from 'src/account/dtos/UpdateUser.dto';
import { SerializedProfile } from 'src/account/serialization/SerializedProfile';
import { AccountService } from 'src/account/services/account/account.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express/multer';
import { RegexFileTypeValidator } from 'src/extensions/MulterRegexFileType.validator';

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
  @UseInterceptors(ClassSerializerInterceptor, FilesInterceptor('profile_picture'))
  @Put()
  async updateAccount(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new RegexFileTypeValidator({ fileType: new RegExp(/(jpg|jpeg|png|gif)$/)})
        ] 
      })
    ) file: Express.Multer.File, @Request() req, @Body() updateUserDto : UpdateUserDto) {
    updateUserDto.profile_picture = file[0]?.path;
    const account = await this.accountService.updateUserProfile(req.user.id, updateUserDto, file);
    if (account)
      return new SerializedProfile(account);
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
