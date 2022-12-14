import { Body, Controller, Get, Put, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Request, UploadedFiles, ParseFilePipe, FileTypeValidator, UsePipes, ValidationPipe, UploadedFile, Post, Param, ParseIntPipe } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';

import { RegexFileTypeValidator } from '../../../../extensions/MulterRegexFileType.validator';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddCartDto } from '../../dtos/AddCart.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { SerializedProfile } from '../../serialization/SerializedProfile';
import { JwtAuthGuard } from '../../../../public/auth/jwt-auth.guard';
import { AccountService } from '../../services/account/account.service';

@Controller('account')
@UseGuards(JwtAuthGuard)
export class AccountController {

  constructor(
    private accountService: AccountService,
  ) {

  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getProfileData(@Request() req) {
    const profile = await this.accountService.getUserProfile(req.user.id);
    if (profile)
      return new SerializedProfile(profile);
  }

  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('profile_picture', {
    storage: diskStorage({
      destination: './uploads/accounts',
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const filename = `${new Date().getTime()}${ext}`;
        callback(null, filename);
      }
    })
  }))
  @UsePipes(new ValidationPipe())
  @Put()
  async updateAccount(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new RegexFileTypeValidator({ regex: new RegExp(/(jpg|jpeg|png|gif)$/)})
        ],
        fileIsRequired: false,
      })
    ) file: Express.Multer.File, @Request() req, @Body() updateUserDto : UpdateUserDto) {
    updateUserDto.profile_picture = file?.path;
    const account = await this.accountService.updateUserProfile(req.user.id, updateUserDto, file);
    if (account)
      return new SerializedProfile(account);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete()
  async deleteAccount(@Request() req) {
    const account = await this.accountService.deleteAccount(req.user.id);
    if (account)
      return new SerializedProfile(account)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/cart')
  async getUserCart(@Request() req) {
    return await this.accountService.getUserCart(req.user)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('/cart/:product_inventory_id')
  async addUserCart(
    @Request() req,
    @Param('product_inventory_id', ParseIntPipe) product_inventory_id: number,
    @Body() addCartDto: AddCartDto,
  ) {
    return await this.accountService.addUserCart(req.user, product_inventory_id, addCartDto.count)
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Delete('/cart/:cart_id')
  async deleteOrDecrementCart(
    @Request() req,
    @Param('cart_id', ParseIntPipe) id: number
  ){
    if (req.body.full)
      return await this.accountService.deleteCart(req.user, id)
    return await this.accountService.decrementCart(req.user, id)
  }
}
