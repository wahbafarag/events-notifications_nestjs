import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Optional } from '@nestjs/common';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @Optional()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @Optional()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Optional()
  password: string;
}

export class UpdateUserStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;
}
