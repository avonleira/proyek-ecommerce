import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { comparePassword } from 'src/utils/bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../dtos/Login.dto';
import { RegisterDto } from '../dtos/Register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(id: number) {
    return this.userRepository.findOneBy({id: id});
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: {email: email}});

    if (user && comparePassword(password, user.password)) {
      const payload = {id: user.id, first_name: user.first_name, last_name: user.last_name}

      return {
        access_token: this.jwtService.sign(payload, {secret: process.env.JWT_SECRET}),
      }
    } else {
      throw new BadRequestException('Wrong credential')
    }
  }

  async register(registerDto: RegisterDto) {
    const { confirm_password, ...user } = registerDto;
    if ((await this.userRepository.find({ where: { email: user.email } })).length > 0) {
      throw new BadRequestException('Email already exist');
    }

    const create = await this.userRepository.create(user);
    const result = await this.userRepository.save(create);
  
    return result;
  }
}
