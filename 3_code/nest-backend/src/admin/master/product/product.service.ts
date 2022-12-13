import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Image } from 'src/typeorm/entities/Image';
import { Product } from 'src/typeorm/entities/Product';
import { ProductCategory } from 'src/typeorm/entities/ProductCategory';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
import { ProductOption } from 'src/typeorm/entities/ProductOption';
import { ProductOptionValue } from 'src/typeorm/entities/ProductOptionValue';
import { In, Repository } from 'typeorm';
import { BulkCreateProductInventoryDto } from './dtos/BulkCreateProductInventory.dto';
import { CreateProductDto } from './dtos/CreateProduct.dto';
import { UpdateProductDto } from './dtos/UpdateProduct.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Product) private productCategory: Repository<ProductCategory>,
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
    const product =  await this.productRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.product_category_id', 'product_category')
      .where('product.id = :id', {id: id})
      .getOne()
      if(!product)
      throw new NotFoundException('Product not found');
    const product_images = JSON.parse(product.image_refs).map((image) => `${process.env.END_POINT}/image/${String(image).split('/')[1]}`)
    return {...product, product_images}
  }

  async createProduct(createProductDto: CreateProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async editProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOneBy({id:id})
    if(!product)
      throw new NotFoundException('Product not found');
    const product_options = JSON.stringify(updateProductDto.product_options)
    const result = await this.productRepository.update({id: id}, {is_draft: true, ...updateProductDto, product_options: product_options});
    if (!result.affected)
      throw new InternalServerErrorException('Failed to update')
    return this.productRepository.findOneBy({id:id})
  }

  async deleteProduct(id: number) {
    return await this.productRepository.softDelete(id);
  }

  async uploadProductImage(id: number, file: Express.Multer.File) {
    const product = await this.productRepository.findOneBy({id:id});
    if(!product)
      throw new NotFoundException('Product not found');
    const image = await this.ImageRepository.save({asset_url: file.path});
    var array_refs = [...JSON.parse(product.image_refs), `image/${image.id}`];
    const result = await this.productRepository.update({id: id}, {...product, image_refs: JSON.stringify(array_refs)});
    if (!result.affected)
      throw new InternalServerErrorException('Failed to update');
    return await this.productRepository.findOneBy({id:id});
  }

  async deleteProductImage(product_id: number, image_id: number) {
    const product = await this.productRepository.findOneBy({id:product_id});
    if(!product)
      throw new NotFoundException('Product not found');
    const image = await this.ImageRepository.findOneBy({id:image_id});
    if(!image)
      throw new NotFoundException('Image not found');
    var image_refs = [...JSON.parse(product.image_refs)];
    var idx = image_refs.indexOf(`image/${image.id}`);
    if (idx <= -1)
      throw new BadRequestException('Cannot delete image that doesn\'t belong to the product')
    image_refs.splice(idx, 1);
    const product_result = await this.productRepository.update({id: product_id}, {...product, image_refs:JSON.stringify(image_refs)})
    const image_result = await this.ImageRepository.delete({id:image_id});
    if (!product_result.affected || !image_result.affected)
      throw new InternalServerErrorException('Failed to update');

    return await this.productRepository.findOneBy({id:product_id});
  }

  async generateProductOptionValue(id: number) {
    const product = await this.productRepository.findOneBy({id: id});
    if(!product)
      throw new NotFoundException('Product not found');

    const product_options = JSON.parse(product.product_options);
    if (!product_options) {
      return {
        combination_option: '[]',
        stock: 0,
        price: 0,
        SKU: ''
      }
    } else {
      const arrVariant = product_options.map(variant => variant.product_option_value)
      var generateVariantProductCombination = (list, n = 0, result = [], current = []) => {
        if (n === list.length)
          result.push(current)
        else
          list[n].forEach(item => generateVariantProductCombination(list, n+1, result, [...current, item]))
      
        return result
      }
      const variants = generateVariantProductCombination(arrVariant);
      const inventory = []
      variants.forEach((variant) => inventory.push({
        combination_option: variant,
        stock: 0,
        price: 0,
        SKU: ''
      }))

      return inventory
    }
  }

  async bulkCreateProductInventory(id: number, bulkCreateProductInventoryDto: BulkCreateProductInventoryDto) {
    const product_inventories = []
    for (let index = 0; index < bulkCreateProductInventoryDto.product_inventories.length; index++) {
      const product_inventory = bulkCreateProductInventoryDto.product_inventories[index];
      const combination_option = JSON.stringify(product_inventory.combination_option);
      const image_refs = JSON.stringify(product_inventory.image_refs);

      const result = await this.productInventoryRepository.createQueryBuilder('pi')
        .where('(combination_option=:co AND product_id=:p_id) OR sku=:sku', {co: combination_option, p_id: id, sku: product_inventory.SKU}).getMany()
      // const result = await this.productInventoryRepository.find({
      //   where: [
      //     { combination_option: combination_option,
      //       product: id
      //     },
      //     { 
      //       SKU: product_inventory.SKU 
      //     }
      //   ]
      // })
      if (result.length > 0)
        throw new BadRequestException('Duplicate product inventory / SKU')

        product_inventories.push({...product_inventory, product_id: id, combination_option: combination_option, image_refs: image_refs})
    }
    try {
      return await this.productInventoryRepository.save(product_inventories)
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Duplicate SKU')
      }
      return new InternalServerErrorException(error.code)
    }
  }

  async bulkEditProductInventory(id: number, bulkUpdateProductInventoryDto: any) {
    const product_inventories = []
    for (let index = 0; index < bulkUpdateProductInventoryDto.product_inventories.length; index++) {
      const product_inventory = bulkUpdateProductInventoryDto.product_inventories[index];
      const combination_option = JSON.stringify(product_inventory.combination_option)
      const image_refs = JSON.stringify(product_inventory.image_refs)

      // const result = await this.productInventoryRepository.find({
      //   where: [
      //     { combination_option: combination_option,
      //       product_id: id
      //     }
      //   ]
      // })
      // if (result.length > 0)
      //   throw new BadRequestException('Duplicate product inventory')

      product_inventories.push({...product_inventory, product_id: id, combination_option: combination_option, image_refs: image_refs})
    }
    const result = []
    try {
      for (let index = 0; index < product_inventories.length; index++) {
        const element = product_inventories[index];
        result.push(await this.productInventoryRepository.update({id: element.id}, {...element, id: undefined}))
      }
      return result;
    } catch (error) {
      if (error?.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException('Duplicate SKU')
      }
      return new InternalServerErrorException(error.code)
    }
  }
}
