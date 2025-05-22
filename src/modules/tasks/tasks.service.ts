import { Injectable } from '@nestjs/common';

import { UpdateTaskDto } from './dto/update-task.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Task } from './entities/task.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { log } from 'console';
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.userRepository.findOneBy({
      id: createTaskDto.userId,
    });
    if (!user)
      throw new NotFoundException(
        `User with ID ${createTaskDto.userId} not found`,
      );

    const task = this.taskRepository.create({
      title: createTaskDto.title,
      description: createTaskDto.description,
      user: user,
    });

    return this.taskRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['user'] });
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.taskRepository.preload({
      id,
      ...updateTaskDto,
    });
    if (!task) throw new NotFoundException(`Task with id ${id} not found`);
    return this.taskRepository.save(task);
  }

  async remove(id: number): Promise<{ message: string }> {
    const task = await this.findOne(id); // this throws NotFoundException if not found
    await this.taskRepository.remove(task);
    return { message: `Task ${id} has removed successfully!` };
  }
  async clearAll(): Promise<void> {
    await this.taskRepository.clear();
    log('All tasks have removed!');
  }
}
