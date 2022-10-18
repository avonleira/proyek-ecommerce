import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/account/dtos/UpdateUser.dto';
import { User } from 'src/typeorm/entities/User';
import { UserAddress } from 'src/typeorm/entities/UserAddress';
import { Repository } from 'typeorm';
import { comparePassword, encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserAddress) private userAddressRepository: Repository<UserAddress>,
  ) {}

  async getUserProfile(id: number) {
    return await this.userRepository.createQueryBuilder("user")
      .leftJoinAndSelect('user.addresses', 'user_address')
      .where("user.id = :id", { id: id })
      .getOne();
  }

  async updateUserProfile(id: number, updateUserDto: UpdateUserDto) {
    const { old_password, confirm_password, ...new_profile } = updateUserDto;
    const user = await this.userRepository.findOneBy({id: id});
    if (!user)
      throw new NotFoundException('User not found');
    if (old_password && !comparePassword(old_password, user.password))
      throw new BadRequestException('Incorrect password');
    if (new_profile.password) {
      new_profile.password = encodePassword(new_profile.password)
    }

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
}
