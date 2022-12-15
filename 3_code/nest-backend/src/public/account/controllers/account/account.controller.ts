import { Body, Controller, Get, Put, Delete, UseInterceptors, ClassSerializerInterceptor, UseGuards, Request, UploadedFiles, ParseFilePipe, FileTypeValidator, UsePipes, ValidationPipe, UploadedFile, Post, Param, ParseIntPipe, Req } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express/multer';

import { RegexFileTypeValidator } from '../../../../extensions/MulterRegexFileType.validator';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AddCartDto } from '../../dtos/AddCart.dto';
import { UpdateUserDto } from '../../dtos/UpdateUser.dto';
import { SerializedProfile } from '../../serialization/SerializedProfile';
import { JwtAuthGuard } from '../../../../public/auth/jwt-auth.guard';
import { AccountService } from '../../services/account/account.service';
import { GeneralSerialization } from 'src/general/GeneralSerialization';
import { CreateAddressDto } from '../../dtos/CreateAddress.dto';
import { UpdateAddressDto } from '../../dtos/UpdateAddress.dto';
import { SerializedAddress } from '../../serialization/SerializedAddress';
import { CheckoutCartDto } from '../../dtos/CheckoutCart.dto';
import { SerializedCheckout, SerializedCheckoutItem } from '../../serialization/SerializedCheckout';
import { plainToClass } from 'class-transformer';
import { CreateReviewDto } from '../../dtos/CreateReview.dto';

@Controller('account')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
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

  @Delete()
  async deleteAccount(@Request() req) {
    const account = await this.accountService.deleteAccount(req.user.id);
    if (account)
      return new SerializedProfile(account)
  }

  @Get('/cart')
  async getUserCart(@Request() req) {
    return await this.accountService.getUserCart(req.user)
  }

  @Post('/cart/checkout')
  async checkoutCart(
    @Request() req,
    @Body() checkoutCartDto: CheckoutCartDto
  ) {
    const result = await this.accountService.checkoutCart(req.user, checkoutCartDto)
    // return result;
    return {...result, cart: plainToClass(SerializedCheckout, {item: result.cart_refs}), cart_refs:undefined}
  }

  @Post('/cart/:product_inventory_id')
  async addUserCart(
    @Request() req,
    @Param('product_inventory_id', ParseIntPipe) product_inventory_id: number,
    @Body() addCartDto: AddCartDto,
  ) {
    return await this.accountService.addUserCart(req.user, product_inventory_id, addCartDto.count)
  }

  @Delete('/cart/:cart_id')
  async deleteOrDecrementCart(
    @Request() req,
    @Param('cart_id', ParseIntPipe) id: number
  ){
    if (req.body.full)
      return await this.accountService.deleteCart(req.user, id)
    return await this.accountService.decrementCart(req.user, id)
  }

  @Get('/address')
  async getAddress(@Request() req) {
    const addresses = await this.accountService.getUserAddress(req.user)
    return addresses.map((address) => new SerializedAddress(address))
  }

  @Get('/address/:address_id')
  async getAddressById(
    @Request() req,
    @Param('address_id', ParseIntPipe) id: number
  ) {
    const address = await this.accountService.getUserAddressById(req.user, id)
    return new SerializedAddress(address)
  }

  @Post('/address')
  async createAddress(
    @Request() req,
    @Body() createAddressDto: CreateAddressDto
  ) {
    return new SerializedAddress(await this.accountService.createAddress(req.user, createAddressDto))
  }

  @Put('/address/:address_id')
  async updateAddress(
    @Request() req,
    @Param('address_id', ParseIntPipe) id: number,
    @Body() updateAddressDto: UpdateAddressDto
  ) {
    return new SerializedAddress(await this.accountService.updateAddress(req.user, id, updateAddressDto))
  }

  @Delete('/address/:address_id')
  async deleteAddress(@Param('address_id') id: number) {
    return await this.accountService.deleteAddress(id);
  }
  
  @Get('wishlist')
  async getUserWishlist(@Request() req) {
    return await this.accountService.getUserWishlist(req.user)
  }

  @Get('wishlist/:id_product')
  async cekWishlistProduct(@Request() req, @Param('id_product', ParseIntPipe) id_product:number) {
    return await this.accountService.isWishlistProduct(req.user, id_product)
  }

  @Post('wishlist/:id_product')
  async addWishlist(@Request() req, @Param('id_product', ParseIntPipe) id_product: number) {
    return await this.accountService.addWishlist(req.user, id_product)
  }

  @Delete('wishlist/:id_wishlist')
  async deleteWishlist(@Request() req, @Param('id_wishlist', ParseIntPipe) id_wishlist: number) {
    return await this.accountService.deleteWishlist(id_wishlist)
  }

  @Get('review')
  async getAllReview(
    @Request()req,
  ) {
    return await this.accountService.getAllReview(req.user);
  }

  @Post('review')
  async createReview(
    @Request() req,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return await this.accountService.createReview(req.user, createReviewDto)
  }
}
