import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  Matches,
} from 'class-validator';
import { Unique } from 'typeorm';
import { IsStrongPassword } from '../docorator/strong-password.decorator';
// used to validate user when it's created
export class CreateUserDto {
  @IsString({ message: 'Invalid username, make sure it is a string!' })
  @Unique(['username'])
  username: string;

  @Unique(['email'])
  @Matches(/^[a-zA-Z0-9._%+-]+@itc\.edu\.kh$/, {
    message: 'Email must be from ITC (e.g., test@itc.edu.kh)',
  })
  @IsEmail()
  email: string;

  @MinLength(6)
  @IsStrongPassword()
  password: string;
}
