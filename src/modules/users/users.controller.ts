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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get('/:id')
  getUseById(@Param('id') id: string) {
    return this.userService.findOne(parseInt(id));
  }

  // @Get('/:username')
  // getUser(@Param('username') username: string) {
  //   return this.userService.getUser(username);
  // }

  @Get()
  getAllUsers() {
    return this.userService.getallUser();
  }

  // @Post('')
  // createUser(
  //   @Body() body: { username: string; email: string; password: string },
  // ) {
  //   return this.userService.createUser(body);
  // }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Patch('/:username')
  updateUser(
    @Param('username') username: string,
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.userService.updateUser(username, body);
  }

  @Delete('/:username')
  deleteUser(
    @Param('username') username: string,
    @Param('password') password: string,
  ) {
    return this.userService.deleteUser(username, password);
  }
}
