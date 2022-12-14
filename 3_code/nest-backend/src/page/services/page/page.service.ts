import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Etalase } from 'src/typeorm/entities/Etalase';
import { PageProp } from 'src/typeorm/entities/PageProp';
import { Product } from 'src/typeorm/entities/Product';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { Tag } from 'src/typeorm/entities/Tag';
import { Repository } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageProp) private pagePropRepository: Repository<PageProp>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Etalase) private EtalaseRepository: Repository<Etalase>,
    @InjectRepository(Tag) private TagRepository: Repository<Tag>,
  ) {}

  async getPageByPath(path: string) {
    return await this.pagePropRepository.findOneBy({path: path});
  }

  async getSearchedProducts(keyword: string){
    return await this.productRepository.createQueryBuilder("p").where("p.description like :key", {key: '%' + keyword + '%'}).orWhere("p.title like :key", {key: '%' + keyword + '%'}).getMany();
  }

  async getCategories(){
    return await this.productCategoryRepository.findBy({level: 1})
  }
  
  async getShowcase(){
    return await this.productRepository.find()
  }

  async getDetailProduct(id_product: number){
    return await this.productRepository.findOneBy({id: id_product})
  }

  async getEtalase(id_discovery: number){
    return await this.EtalaseRepository.findBy({id: id_discovery})
  }

  async getTagged(id_discovery: number){
    return await this.TagRepository.findBy({id_etalase: id_discovery})
  }

  async getTaggedProducts(list_id_product: Array<Tag>){
    let products = []
    for (let i = 0; i < list_id_product.length; i++) {
      products.push(await this.productRepository.findOneBy({id:list_id_product[i].id_product}))
    }
    return products
  }
}
