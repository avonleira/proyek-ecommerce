import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams, UpdateUserParams } from 'src/users/types/types';
import { UserAddress } from 'src/typeorm/entities/UserAddress';
import { encodePassword } from 'src/utils/bcrypt';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserAddress) private userAddressRepository: Repository<UserAddress>,
  ) {}

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({id: id});
  }

  findByEmail(email: string) {
    return this.userRepository.find({ where: {email: email}});
  }

  create(userDetails: CreateUserParams) {
    const password = encodePassword(userDetails.password)
    const newUser = this.userRepository.create({...userDetails, password});
    return this.userRepository.save(newUser);
  }

  update(id: number, userDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...userDetails });
  }

  remove(id: number) {
    return this.userRepository.delete({ id })
  }
}
