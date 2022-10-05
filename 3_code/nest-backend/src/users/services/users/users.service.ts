import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/typeorm/entities/User';
import { CreateUserParams } from 'src/utils/types';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  getAllUser() {
    return this.userRepository.find()
  }

  getUserById(id: number) {
    return this.userRepository.findOneBy({id: id});
  }

  getUserByEmail(email: string) {
    return this.userRepository.find({ where: {email: email}});
  }

  createUser(userDetails: CreateUserParams) {
    const newUser = this.userRepository.create(userDetails);
    return this.userRepository.save(newUser);
  }
}
