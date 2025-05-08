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

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UserService) {}
  @Get('/:username')
  getUser(@Param('username') username: string) {
    return this.userService.getUser(username);
  }

  @Post('')
  createUser(
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.userService.createUser(body);
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
