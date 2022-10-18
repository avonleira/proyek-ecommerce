import { Param, Body, Controller, Get, Post, Put, UsePipes, ValidationPipe, ParseIntPipe, BadRequestException, NotImplementedException, Delete, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';
import { User } from 'src/typeorm/entities/User';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }
  
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findOne(id);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    if (await (await this.userService.findByEmail(createUserDto.email)).length > 0) {
      throw new BadRequestException('Email already exist');
    }
    const createUserParams = {
      email: createUserDto.email,
      password: createUserDto.password,
      name: createUserDto.name,
      gender: createUserDto.gender,
      phone_number: createUserDto.phone_number,
      date_birth: new Date(createUserDto.date_birth),
    }
    const user = await this.userService.create(createUserParams);
    return user;
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    var user = await this.userService.findOne(id);
    if (!user)
      throw new NotFoundException('User not found');
    if (updateUserDto.oldPassword && !await bcrypt.compare(updateUserDto.oldPassword, user.password))
      throw new BadRequestException('Incorrect password');
    const updateUserParams = {
      password: updateUserDto.password ? await bcrypt.hash(updateUserDto.password, await bcrypt.genSalt()) : undefined,
      name: updateUserDto.name,
      gender: updateUserDto.gender,
      phone_number: updateUserDto.phone_number,
      date_birth: new Date(updateUserDto.date_birth),
    }
    const result = await this.userService.update(id, updateUserParams);
    if (result.affected > 0) {
      user = await this.userService.findOne(id);
      return user;
    } else {
      throw new BadRequestException('Failed to update')
    }
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    const result = await this.userService.remove(id);
    if (result.affected > 0) {
      const user = await this.userService.findOne(id);
      return user;
    } else {
      throw new BadRequestException('Failed to delete')
    }
  }
}
