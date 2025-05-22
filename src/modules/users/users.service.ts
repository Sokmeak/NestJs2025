import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Task } from '../tasks/entities/task.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async getallUser(): Promise<User[]> {
    const users = await this.userRepository.find();
    return users;
  }

  async getUser(username: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new NotFoundException(`User ${username} not found`);
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    // Check if email exists
    const existingUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

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
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
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
