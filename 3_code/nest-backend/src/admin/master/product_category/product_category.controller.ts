import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateProductCategoryDto } from './dtos/CreateProductCategory.dto';
import { UpdateProductCategoryDto } from './dtos/UpdateProductCategory.dto';
import { ProductCategoryService } from './product_category.service';

@Controller('admin/master/kategori')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {
    
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    return await this.productCategoryService.getAll()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':category_id')
  async getById(@Param('category_id', ParseIntPipe) id: number) {
    return await this.productCategoryService.getById(id)
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createCategory(@Body() createProductCategoryDto: CreateProductCategoryDto) {
    return await this.productCategoryService.createCategory(createProductCategoryDto)
  }

  @UsePipes(new ValidationPipe())
  @Put(':category_id')
  async updateCategory(@Param('category_id', ParseIntPipe) id: number, @Body() updateProductCategoryDto: UpdateProductCategoryDto) {
    return await this.productCategoryService.editCategory(id, updateProductCategoryDto)
  }

  @Delete(':category_id')
  async deleteCategory(@Param('category_id', ParseIntPipe) id: number) {
    return await this.productCategoryService.deleteCategory(id)
  }
}
