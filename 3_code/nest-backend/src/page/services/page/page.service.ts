import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PageProp } from 'src/typeorm/entities/PageProp';
import { Product } from 'src/typeorm/entities/Product';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageProp) private pagePropRepository: Repository<PageProp>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async getPageByPath(path: string) {
    return await this.pagePropRepository.findOneBy({path: path});
  }

  async getSearchedProducts(keyword: string){
    return await this.productRepository.createQueryBuilder("p").where("p.description like :key", {key: '%' + keyword + '%'}).orWhere("p.title like :key", {key: '%' + keyword + '%'}).getMany();
  }
}
