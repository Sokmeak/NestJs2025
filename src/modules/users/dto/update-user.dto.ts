import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    // You can add additional properties or methods here if needed
    // For example, if you want to make the email field optional in the update DTO
    // email?: string;
    // password?: string;
    // username?: string;
}
