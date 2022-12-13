import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateProductOptionDto } from './dtos/CreateProductOption.dto';
import { CreateProductOptionValueDto } from './dtos/CreateProductOptionValue.dto';
import { UpdateProductOptionDto } from './dtos/UpdateProductOption.dto';
import { ProductOptionService } from './product_option.service';

@Controller('admin/master/varian-produk')
export class ProductOptionController {
  constructor(private productOptionService: ProductOptionService) {

  }

  @Get()
  async getAll() {
    return await this.productOptionService.getAll();
  }

  @Get(':product_option_id')
  async getById(@Param('product_option_id', ParseIntPipe) id: number) {
    return await this.productOptionService.getById(id);
  }

  @Post()
  async createProductOption(@Body() createProductOptionDto: CreateProductOptionDto) {
    return await this.productOptionService.createProductOption(createProductOptionDto);
  }

  @Put(':product_option_id')
  async editProductOption(
    @Param('product_option_id', ParseIntPipe) id: number,
    @Body() updateProductOpitonDto: UpdateProductOptionDto
  ) {
    return await this.productOptionService.editProductOption(id, updateProductOpitonDto)
  }

  @Delete(':product_option_id')
  async deleteProductOption(@Param('product_option_id', ParseIntPipe) id: number) {
    return await this.productOptionService.deleteProductOption(id);
  }

  //Product Option Value
  @Post(':product_option_id/nilai-varian')
  async addProductOptionValue(
    @Param('product_option_id', ParseIntPipe) id: number,
    @Body() createProductOptionValueDto: CreateProductOptionValueDto,
  ) {
    return await this.productOptionService.createProductOptionValue(id, createProductOptionValueDto);
  }

  @Delete(':product_option_id/nilai-varian/:product_option_value_id')
  async deleteProductOptionValue(
    @Param('product_option_id', ParseIntPipe) product_option_id: number,
    @Param('product_option_value_id', ParseIntPipe) product_option_value_id: number,
  ) {
    return await this.productOptionService.deleteProductOptionValue(product_option_value_id);
  }
}
