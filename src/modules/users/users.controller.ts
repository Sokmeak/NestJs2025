import {
  Get,
  Param,
  Controller,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';

import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get('/:id')
  getUseById(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }


  @Get()
  getAllUsers() {
    return this.userService.getallUser();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(parseInt(id), updateUserDto);
  }
  @Delete('/:id')
  deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(parseInt(id));
  }

  @Delete('/:username')
  deleteUser(@Param('username') username: string) {
    return this.userService.deleteUser(username);
  }
}
