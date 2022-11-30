import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { Repository } from 'typeorm';
import { CreateProductCategoryDto } from './dtos/CreateProductCategory.dto';
import { UpdateProductCategoryDto } from './dtos/UpdateProductCategory.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>,
  ) {

  }

  async getAll() {
    return await this.productCategoryRepository.find();
  }

  async getById(id: number) {
    return await this.productCategoryRepository.findOneBy({id: id});
  }

  async createCategory(createProductCategoryDto: CreateProductCategoryDto) {
    if (createProductCategoryDto.parent_id){
      const parent = await this.productCategoryRepository.findOneBy({id: createProductCategoryDto.parent_id})
      if (!parent)
        throw new NotFoundException("Parent not found")
    }
    return await this.productCategoryRepository.save(createProductCategoryDto);
  }

  async editCategory(id: number, updateProductCategoryDto: UpdateProductCategoryDto) {
    const productCategory = await this.productCategoryRepository.findOneBy({id: id});
    if (!productCategory)
      throw new NotFoundException('Product category not found');
    const result = await this.productCategoryRepository.update({id: id}, updateProductCategoryDto)
    if (!result.affected)
      throw new InternalServerErrorException('Failed to update');
    return await this.productCategoryRepository.findOneBy({id: id});
  }

  async deleteCategory(id: number) {
    const productCategory = await this.productCategoryRepository.findOneBy({id: id});
    if (!productCategory)
      throw new NotFoundException('Product category not found');
    return await this.productCategoryRepository.softDelete({id: id});
  }
}
