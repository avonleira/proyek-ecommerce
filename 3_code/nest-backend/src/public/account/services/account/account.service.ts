import { BadRequestException, Injectable, NotFoundException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/public/account/dtos/UpdateUser.dto';
import { User } from 'src/typeorm/entities/User';
import { UserAddress } from 'src/typeorm/entities/UserAddress';
import { Repository } from 'typeorm';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';
import * as fs from 'fs';
import { Cart } from 'src/typeorm/entities/Cart';
import { Product } from 'src/typeorm/entities/Product';
import { ProductInventory } from 'src/typeorm/entities/ProductInventory';
@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserAddress) private readonly userAddressRepository: Repository<UserAddress>,
    @InjectRepository(Cart) private readonly cartRepository:Repository<Cart>,
    @InjectRepository(Product) private readonly productRepository:Repository<Product>,
    @InjectRepository(ProductInventory) private readonly productInventoryRepository:Repository<ProductInventory>,
  ) {}

  async getUserProfile(id: number) {
    return await this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect('user.addresses', 'user_address')
      .where("user.id = :id", { id: id })
      .getOne();
  }

  async updateUserProfile(id: number, updateUserDto: UpdateUserDto, file) {
    const { old_password, confirm_password, ...new_profile } = updateUserDto;
    const user = await this.userRepository.findOneBy({id: id});
    if (!user)
      throw new NotFoundException('User not found');
    if (old_password && !comparePassword(old_password, user.password))
      throw new BadRequestException('Incorrect password');
    if (new_profile.password) 
      new_profile.password = encodePassword(new_profile.password)
    if (updateUserDto.profile_picture)
      fs.unlink(`.\\${user.profile_picture}`, (err) => new InternalServerErrorException(err))
    const result = await this.userRepository.update({ id }, { ...new_profile });
    if (result.affected > 0) {
      const new_user = await this.userRepository.findOneBy({id: id});
      return new_user;
    } else {
      throw new BadRequestException('Failed to update');
    }
  }

  async deleteAccount(id: number) {
    const user = await this.userRepository.findOneBy({id: id});
    const result = await this.userRepository.softDelete({ id });
    if (result.affected > 0) {
      return user;
    } else {
      throw new BadRequestException('Failed to delete')
    }
  }

  async getUserCart(user: User) {
    return await this.cartRepository.createQueryBuilder('cart').where('user_id=:id', {id: user.id}).getMany()
  }

  async addUserCart(user: User, product_inventory_id: number, qty: number) {
    const product_inventory = await this.productInventoryRepository.findOneBy({ id: product_inventory_id })
    if (!product_inventory)
      throw new NotFoundException('Product not found!')

    const cart = await this.cartRepository.createQueryBuilder('cart').where('user_id=:u_id AND product_inventory_id=:pi_id', {u_id: user.id, pi_id: product_inventory.id}).getOne()
    if (cart) {
      const result = await this.cartRepository.update({id: cart.id}, { ...cart, qty: cart.qty + qty });
      if (result.affected > 0) {
        return await this.cartRepository.findOneBy({id: cart.id});
      } else {
        throw new BadRequestException('Failed to update');
      }
    } 
    const new_cart = {user: user, product_inventory: product_inventory,  qty: qty}
    return await this.cartRepository.save(new_cart);
  }

  async deleteCart(user: User, id: number) {
    const cart = await this.cartRepository.createQueryBuilder('cart')
      .leftJoinAndSelect('cart.user', 'user')
      .where('cart.id = :id', {id: id})
      .getOne()
    if (!cart)
      throw new NotFoundException("Cart not found!");
    if (cart.user.id != user.id)
      throw new UnauthorizedException("Cannot delete cart!");
    const result = await this.cartRepository.delete(id);
    if (result.affected <= 0)
      throw new InternalServerErrorException("Failed to delete");
    return result;
  }

  async decrementCart(user: User, id: number) {
    const cart = await this.cartRepository.createQueryBuilder('cart')
      .leftJoinAndSelect('cart.user', 'user')
      .where('cart.id = :id', {id: id})
      .getOne()
    if (!cart)
      throw new NotFoundException("Cart not found!");
    if (cart.user?.id != user.id)
      throw new UnauthorizedException("Cannot delete cart!");
    if (cart.qty <= 1) 
      return await this.cartRepository.delete(id)
    return await this.cartRepository.save({ ...cart, qty: cart.qty - 1 })
  }
}
