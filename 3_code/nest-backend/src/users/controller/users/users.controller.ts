import { Param, Body, Controller, Get, Post, Put, UsePipes, ValidationPipe, ParseIntPipe, HttpException, HttpStatus } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }
  @Get()
  async getAllUser() {
    const users = await this.userService.getAllUser();
    return users;
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const users = await this.userService.getUserById(id);
    return users;
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() createUserDto: CreateUserDto) {
    if (await (await this.userService.getUserByEmail(createUserDto.email)).length > 0) {
      throw new HttpException('Email already exist', HttpStatus.BAD_REQUEST);
    }
    const createUserParams = {
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, await bcrypt.genSalt()),
      name: createUserDto.name,
      gender: createUserDto.gender,
      phone_number: createUserDto.phone_number,
      date_birth: new Date(createUserDto.date_birth),
    }
    return this.userService.createUser(createUserParams);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() UpdateUserDto: UpdateUserDto) {
    // this.userService.updateUser(id);
    throw new HttpException('Not implemented', HttpStatus.NOT_IMPLEMENTED)
  }
}
