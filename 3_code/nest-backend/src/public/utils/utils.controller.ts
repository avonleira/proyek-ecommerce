import { HttpService } from '@nestjs/axios';
import { Body, ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, Post, Res, StreamableFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { classToPlain } from 'class-transformer';
import { join } from 'path';
import { of } from 'rxjs';
import { GetCostDto } from './dtos/GetCost.dto';
import { UtilsService } from './utils.service';

@UseInterceptors(ClassSerializerInterceptor)
@UsePipes(new ValidationPipe())
@Controller('utils')
export class UtilsController {
  constructor(
    private readonly utilsService: UtilsService,
    private readonly httpService: HttpService
  ){

  }

  @Get('image/:image_id')
  async getImage(@Param('image_id', ParseIntPipe) id: number, @Res() res) {
    const image = await this.utilsService.getImage(id)
    return of(res.sendFile(join(process.cwd(), image.asset_url)))
  }

  @Get('province')
  async getProvince() {
    const headersRequest = {
      'Content-Type': 'application/json',
      'key': `${process.env.RAJA_ONGKIR_KEY}`,
    };
  
    return await this.httpService.axiosRef.get(`${process.env.RAJA_ONGKIR_BASE_URL}/province`, { headers: headersRequest })
      .catch((e) => e)
      .then((o) => o.data.rajaongkir.results)
  }

  @Get('city/:province_id')
  async getCityByProvinceId(@Param('province_id', ParseIntPipe) id: number) {
    const headersRequest = {
      'Content-Type': 'application/json',
      'key': `${process.env.RAJA_ONGKIR_KEY}`
    };
  
    return await this.httpService.axiosRef.get(`${process.env.RAJA_ONGKIR_BASE_URL}/city?province=${id}`, { headers: headersRequest})
      .catch((e) => e)
      .then((o) => o.data.rajaongkir.results)
  }

  @Post('cost')
  async getCost(@Body() getCostDto: GetCostDto) {
    const headersRequest = {
      'Content-Type': 'application/json',
      'key': `${process.env.RAJA_ONGKIR_KEY}`
    };
    const data = {...getCostDto}
  
    return await this.httpService.axiosRef.post(`${process.env.RAJA_ONGKIR_BASE_URL}/cost`, data, { headers: headersRequest})
      .catch((e) => e)
      .then((o) => o.data.rajaongkir.results)
  }
  @Get('header-categories')
  async getHeaderCategories(){
    let categories = await this.utilsService.getCategories()
    return {...categories}
  }
}
