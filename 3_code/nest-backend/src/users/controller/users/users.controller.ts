import { Param, Body, Controller, Get, Post, Put, UsePipes, ValidationPipe, ParseIntPipe, BadRequestException, NotImplementedException, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/CreateUser.dto';
import { UsersService } from 'src/users/services/users/users.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {

  constructor(private userService: UsersService) {

  }
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    if (await (await this.userService.findByEmail(createUserDto.email)).length > 0) {
      throw new BadRequestException('Email already exist');
    }
    const createUserParams = {
      email: createUserDto.email,
      password: await bcrypt.hash(createUserDto.password, await bcrypt.genSalt()),
      name: createUserDto.name,
      gender: createUserDto.gender,
      phone_number: createUserDto.phone_number,
      date_birth: new Date(createUserDto.date_birth),
    }
    return await this.userService.create(createUserParams);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.findOne(id);
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
    return await this.userService.update(id, updateUserParams);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
