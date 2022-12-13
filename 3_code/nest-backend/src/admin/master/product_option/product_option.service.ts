import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductOption } from 'src/typeorm/entities/ProductOption';
import { ProductOptionValue } from 'src/typeorm/entities/ProductOptionValue';
import { Repository } from 'typeorm';
import { CreateProductOptionDto } from './dtos/CreateProductOption.dto';
import { CreateProductOptionValueDto } from './dtos/CreateProductOptionValue.dto';
import { UpdateProductOptionDto } from './dtos/UpdateProductOption.dto';

@Injectable()
export class ProductOptionService {

  constructor(
    @InjectRepository(ProductOption) private productOptionRepository: Repository<ProductOption>,
    @InjectRepository(ProductOptionValue) private productOptionValueRepository: Repository<ProductOptionValue>,
  ) {

  }

  async getAll() {
    return await this.productOptionRepository.find();
  }

  async getById(id: number) {
    const productOption = await this.productOptionRepository.createQueryBuilder("product_option")
      .leftJoinAndSelect('product_option.product_option_values', 'product_option_values')
      .where("product_option.id = :id", { id: id })
      .getOne();
    if (!productOption)
      throw new NotFoundException('Product option not found');
    return productOption;
  }

  async createProductOption(createProductOptionDto: CreateProductOptionDto) {
    return await this.productOptionRepository.save(createProductOptionDto)
  }

  async editProductOption(id: number , updateProductOpitonDto: UpdateProductOptionDto) {
    const productOption = await this.productOptionRepository.findOneBy({id: id});
    if (!productOption)
      throw new NotFoundException('Product option not found');
    const result = await this.productOptionRepository.update({id: id}, updateProductOpitonDto);
    if (!result.affected)
      throw new InternalServerErrorException('Failed to update');
    return this.productOptionRepository.findOneBy({id: id});
  }

  async deleteProductOption(id: number) {
    const productOption = await this.productOptionRepository.findOneBy({id: id});
    if (!productOption)
      throw new NotFoundException('Product option not found');
    const result = await this.productOptionRepository.softDelete({id: id});
    if (!result.affected)
      throw new InternalServerErrorException('Failed to delete');
    return result;
  }

  async createProductOptionValue(id: number, createProductOptionValue: CreateProductOptionValueDto) {
    return await this.productOptionValueRepository.save({product_option_id: id, ...createProductOptionValue});
  }

  async deleteProductOptionValue(id: number) {
    const productOptionValue = await this.productOptionValueRepository.findOneBy({id: id});
    if (!productOptionValue)
      throw new NotFoundException('Product option value not found');
    const result = await this.productOptionValueRepository.softDelete({id: id});
    if (!result.affected)
      throw new InternalServerErrorException('Failed to delete');
    return result;
  }
}
