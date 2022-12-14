import { Body, ClassSerializerInterceptor, Controller, Get, Post, Req, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreatePromoDto } from './dtos/CreatePromo.dto';
import { PromoService } from './promo.service';

@Controller('admin/master/promo')
@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe({ transform: true }))
export class PromoController {
  constructor(private readonly promoService: PromoService) {

  }

  @Get()
  async getAll() {
    return await this.promoService.getAll();
  }

  @Post()
  async createPromo(@Body() createPromoDto: CreatePromoDto) {
    console.log(createPromoDto)
    return await this.promoService.getAll();
  }
}
