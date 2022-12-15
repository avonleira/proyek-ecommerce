import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Dtrans } from 'src/typeorm/entities/Dtrans';
import { Etalase } from 'src/typeorm/entities/Etalase';
import { Htrans } from 'src/typeorm/entities/Htrans';
import { PageProp } from 'src/typeorm/entities/PageProp';
import { Product } from 'src/typeorm/entities/Product';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
import { ProductView } from 'src/typeorm/entities/ProductView';
import { Review } from 'src/typeorm/entities/Review';
import { Tag } from 'src/typeorm/entities/Tag';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(PageProp) private pagePropRepository: Repository<PageProp>,
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(ProductCategory) private productCategoryRepository: Repository<ProductCategory>,
    @InjectRepository(Etalase) private EtalaseRepository: Repository<Etalase>,
    @InjectRepository(Tag) private TagRepository: Repository<Tag>,
    @InjectRepository(ProductView) private productViewRepository: Repository<ProductView>,
    @InjectRepository(Review) private reviewRepository: Repository<Review>,
    @InjectRepository(Dtrans) private dtransRepository: Repository<Dtrans>,
    @InjectRepository(Htrans) private htransRepository: Repository<Htrans>,
    @InjectRepository(ProductInventory) private productInventoryRepository: Repository<ProductInventory>,
    @InjectDataSource() private readonly connection: DataSource
  ) {}

  async getPageByPath(path: string) {
    return await this.pagePropRepository.findOneBy({path: path});
  }

  async getSearchedProducts(q: string, tsr: number, pmin: number, pmax: number, sort: number){
    let query = "SELECT * FROM product WHERE true"
    console.log(q)
    if(q) query += " AND description like '%"+q+"%' OR title like '%"+q+"%'"
    query += ";"
    let products = await this.connection.query(query)
    for (let i = 0; i < products.length; i++) {
      products[i].pass = true
      let temp_reviews = await this.reviewRepository.createQueryBuilder('r').where('r.productId=:p_id', {p_id: products[i].id}).getMany()
      let acc_rating = 0
      for (let j = 0; j < temp_reviews.length; j++) {
        acc_rating+=temp_reviews[j].rating
      }
      products[i].rating = acc_rating/(temp_reviews.length == 0? 1 : temp_reviews.length)
      if(tsr){
        if(tsr == 1){
          let temp = products.length
          for (let idx = 0; idx < temp; idx++) {
            if(products[idx].rating < 3){
              products[idx].pass = false
            }
          }
        }
      }
      let prod_inv = await this.productInventoryRepository.createQueryBuilder('pi').where('pi.productId=:p_id', {p_id: products[i].id}).getMany()
      let price = 0
      let cek = true
      for (let l = 0; l < prod_inv.length; l++) {
        if(pmin){
          if(prod_inv[l].price < pmin) cek = false 
        }
        if(pmax){
          if(prod_inv[l].price > pmax) cek = false 
        }
        price = prod_inv[l].price
      }
      if(!cek){
        products[i].pass = false
      }else{
        products[i].price = price
      }
      let prod_views = await this.productViewRepository.createQueryBuilder('r').where('r.productId=:p_id', {p_id: products[i].id}).getMany()
      products[i].views = prod_views.length
      // let temp_dtrans = await this.dtransRepository.createQueryBuilder('d').where('d.productId=:p_id', {p_id: products[i].id}).getMany()
      // let ctr_buyed = 0
      // for (let k = 0; k < temp_dtrans.length; k++) {
      //   let temp = await this.htransRepository.createQueryBuilder('h').where('h.id=:p_id', {p_id: temp_dtrans[i].htrans.id}).getOne()
      //   if(temp.order_status == 3){
      //     ctr_buyed += 1
      //   }
      // }
      // products[i].buyed = ctr_buyed
    }
    let long_temp = products.length
    for (let index = 0; index < long_temp; index++) {
      if(!products[index].pass){
        products.splice(index, 1)
        index--
        long_temp--
      }
    }
    let res = []
    if(sort){
      if(sort == 1){
        res = products.sort((a, b) => b.rating-a.rating)
      }else if(sort == 2){
        res = products.sort((a, b) => b.created_at-a.created_at)
      }else if(sort == 3){
        res = products.sort((a, b) => b.price-a.price)
      }else if(sort == 4){
        res = products.sort((a, b) => a.price-b.price)
      }
    }
    return res
  }

  async getCategories(){
    return await this.productCategoryRepository.findBy({level: 1})
  }
  
  async getShowcase(){
    return await this.productRepository.find()
  }

  async getDetailProduct(id_product: number, user:any){
    console.log(user)
    let product = await this.productRepository.findOneBy({id: id_product})
    if(user) await this.productViewRepository.create({user: user, product: product})
    return product
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
