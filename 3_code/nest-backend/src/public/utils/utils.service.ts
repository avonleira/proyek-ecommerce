import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/Image';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { Repository } from 'typeorm';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>,
    @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>
  ) {
    
  }

  async getImage(id: number) {
    const image = await this.imageRepository.findOneBy({id: id})
    if (!image) 
      throw new NotFoundException('Image not found')
    return image;
  }

  async getCategories(){
    return await this.productCategoryRepository.find()
  }

  async test() {
    return 0
  }
}
