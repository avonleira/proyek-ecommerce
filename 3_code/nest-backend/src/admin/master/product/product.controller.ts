import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('admin/master/produk')
export class ProductController {
  constructor(private productService: ProductService) {

  }

  @Get()
  async getAll() {
    return this.productService.getAll();
  }

  @Get(':id')
  async getById(@Param(ParseIntPipe) id: number) {
    return this.productService.getById(id);
  }

  @Post()
  async createProduct(@Body() createProductDto: any) {

  }

  @Put()
  async editProduct(@Body() updateProductDto: any) {

  }

  @Delete(':id')
  async deleteProduct(@Param(ParseIntPipe) id: number) {
    
  }

}
