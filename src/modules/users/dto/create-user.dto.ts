import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
// used to validate user when it's created
export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
