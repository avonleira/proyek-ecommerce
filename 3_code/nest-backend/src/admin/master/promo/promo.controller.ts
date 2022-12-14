import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { GeneralSerialization } from 'src/general/GeneralSerialization';
import { CreatePromoDto } from './dtos/CreatePromo.dto';
import { updatePromoDto } from './dtos/UpdatePromo.dto';
import { PromoService } from './promo.service';

@Controller('admin/master/promo')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class PromoController {
  constructor(private readonly promoService: PromoService) {

  }

  @Get()
  async getAll() {
    return await (await this.promoService.getAll()).map((promo) => new GeneralSerialization(promo));
  }

  @Get(':promo_id')
  async getById(@Param('promo_id', ParseIntPipe) id: number) {
    return new GeneralSerialization(await this.promoService.getById(id));
  }

  @Post()
  async createPromo(@Body() createPromoDto: CreatePromoDto) {
    return new GeneralSerialization(await this.promoService.createPromo(createPromoDto));
  }

  @Put(':promo_id')
  async editPromo(
    @Param('promo_id', ParseIntPipe) id: number, 
    @Body() updatePromoDto: updatePromoDto
  ) {
    return new GeneralSerialization(await this.promoService.editPromo(id, updatePromoDto));
  }

  @Delete(':promo_id')
  async deletePromo(@Param('promo_id') id: number) {
    return await this.promoService.deletePromo(id)
  }
}
