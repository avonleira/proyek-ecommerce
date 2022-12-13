import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/Image';
import { Repository } from 'typeorm';

@Injectable()
export class UtilsService {
  constructor(
    @InjectRepository(Image) private imageRepository: Repository<Image>
  ) {
    
  }

  async getImage(id: number) {
    const image = await this.imageRepository.findOneBy({id: id})
    if (!image) 
      throw new NotFoundException('Image not found')
    return image;
  }
}
