import { Body, ClassSerializerInterceptor, Controller, Delete, Get, Param, ParseFilePipe, ParseIntPipe, Post, Put, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { plainToClass } from 'class-transformer';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RegexFileTypeValidator } from 'src/extensions/MulterRegexFileType.validator';
import { GeneralSerialization } from 'src/general/GeneralSerialization';
import { BulkCreateProductInventoryDto } from './dtos/BulkCreateProductInventory.dto';
import { BulkUpdateProductInventoryDto } from './dtos/BulkUpdateProductInventory.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';
import { ProductService } from './product.service';
import { SerializedGetAllProducts } from './serialization/SerializedGetAllProducts';
import { SerializedGetProduct } from './serialization/SerializedGetProduct';

@Controller('admin/master/produk')
export class ProductController {
  constructor(private productService: ProductService) {

  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async getAll() {
    const products = await this.productService.getAll();
    return products.map((product) => new SerializedGetAllProducts(product))
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':product_id')
  async getById(@Param('product_id', ParseIntPipe) id: number) {
    const result = await this.productService.getById(id);
    const image_refs = JSON.parse(result.product.image_refs).map((image) => `${process.env.END_POINT}/utils/image/${String(image).split('/')[1]}`)
    return {...result.product, product_options: result.product_option, image_refs: image_refs};
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':product_id')
  async editProduct(@Param('product_id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto) {
    const result = await this.productService.editProduct(id, updateProductDto);
    const image_refs = JSON.parse(result.product.image_refs).map((image) => `${process.env.END_POINT}/utils/image/${String(image).split('/')[1]}`)
    return {...result.product, product_options: result.product_option, image_refs: image_refs};
  }

  @Delete(':product_id')
  async deleteProduct(@Param('product_id', ParseIntPipe) id: number) {
    return this.productService.deleteProduct(id);
  }

  @Post(":product_id/image")
  @UseInterceptors(ClassSerializerInterceptor, FileInterceptor('product_image', {
    storage: diskStorage({
      destination: './uploads/products',
      filename: (req, file, callback) => {
        const ext = extname(file.originalname);
        const filename = `${new Date().getTime()}${ext}`;
        callback(null, filename);
      }
    })
  }))
  @UsePipes(new ValidationPipe())
  async uploadProductImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new RegexFileTypeValidator({ regex: new RegExp(/(jpg|jpeg|png|gif)$/)})
        ]
      })
    ) file: Express.Multer.File,
    @Param('product_id', ParseIntPipe) id: number
  ) {
    return await this.productService.uploadProductImage(id, file);
  }

  @Delete(":product_id/image/:image_id")
  @UsePipes(new ValidationPipe())
  async deleteProductImage(@Param('product_id', ParseIntPipe) product_id: number, @Param('image_id', ParseIntPipe) image_id: number) {
    return await this.productService.deleteProductImage(product_id, image_id)
  }

  @Get(':product_id/generate-varian') 
  async generateProductOptionValue(@Param('product_id', ParseIntPipe) id:number) {
    return await this.productService.generateProductOptionValue(id);
  }

  @UsePipes(new ValidationPipe())
  @Post(':product_id/inventory') 
  async bulkCreateProductInventory(
    @Param('product_id', ParseIntPipe) id:number,
    @Body() bulkCreateProductInventoryDto: BulkCreateProductInventoryDto  
  ) {
    return await this.productService.bulkCreateProductInventory(id, bulkCreateProductInventoryDto);
  }

  @UsePipes(new ValidationPipe())
  @Put(':product_id/inventory') 
  async bulkEditProductInventory(
    @Param('product_id', ParseIntPipe) id:number,
    @Body() bulkUpdateProductInventoryDto: BulkUpdateProductInventoryDto
  ) {
    return await this.productService.bulkEditProductInventory(id, bulkUpdateProductInventoryDto);
  }
}
