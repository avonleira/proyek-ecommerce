import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/Image';
import { Product } from 'src/typeorm/entities/Product';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
import { ProductOption } from 'src/typeorm/entities/ProductOption';
import { ProductOptionValue } from 'src/typeorm/entities/ProductOptionValue';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductInventory) private productInventoryRepository: Repository<ProductInventory>,
    @InjectRepository(ProductOption) private productOptionRepository: Repository<ProductOption>,
    @InjectRepository(ProductOptionValue) private productOptionValueRepository: Repository<ProductOptionValue>,
    @InjectRepository(Image) private ImageRepository: Repository<Image>,
  ) {

  }

  async getAll() {
    return await this.productRepository.find();
  }

  async getById(id: number) {
    return await this.productRepository.findOneBy({id:id});
  }

  async createProduct(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async editProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({id:id})
    if(!product)
      throw new NotFoundException('Product not found');
    const result = await this.productRepository.update({id: id}, {is_draft: true, ...updateProductDto});
    if (!result.affected)
      throw new InternalServerErrorException('Failed to update')
    return this.productRepository.findOneBy({id:id})
  }

  async deleteProduct(id: number) {
    return await this.productRepository.softDelete(id);
  }

  async uploadProductImage(id: number, file) {
    const product = await this.productRepository.findOneBy({id:id})
    if(!product)
      throw new NotFoundException('Product not found');
    const image = await this.ImageRepository.save({asset_url: file.path})
    var array_refs = [...JSON.parse(product.image_refs), `image/${image.id}`]
    const result = await this.productRepository.update({id: id}, {...product, image_refs: JSON.stringify(array_refs)})
    if (!result.affected)
      throw new InternalServerErrorException('Failed to update')
    return this.productRepository.findOneBy({id:id})
  }
}
