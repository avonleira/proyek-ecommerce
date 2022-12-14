import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { encodePassword } from '../../../utils/bcrypt';
import { User } from '../../../typeorm/entities/User';
import { UserAddress } from '../../../typeorm/entities/UserAddress';
import { CreateUserParams, UpdateUserParams } from '../../types/types';

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
