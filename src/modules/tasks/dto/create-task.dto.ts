import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  title: string;
  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  createdAt: Date;
  @IsOptional()
  completedAt: Date;

  @IsNumber()
  userId: number;
}
