import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getUser(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new NotFoundException(`User ${username} not found`);
    return user;
  }

  async createUser(body: {
    username: string;
    email: string;
    password: string;
  }): Promise<User> {
    const newUser = this.userRepository.create(body);
    return this.userRepository.save(newUser);
  }

  async updateUser(
    username: string,
    body: { username: string; email: string; password: string },
  ): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new NotFoundException(`User ${username} not found`);

    Object.assign(user, body);
    return this.userRepository.save(user);
  }

  async deleteUser(
    username: string,
    password: string,
  ): Promise<{ message: string }> {
    const user = await this.userRepository.findOneBy({ username, password });
    if (!user) throw new NotFoundException(`Invalid username or password`);

    await this.userRepository.remove(user);
    return {
      message: `User ${username} deleted successfully`,
    };
  }
}
