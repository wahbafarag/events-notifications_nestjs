import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(ValidationPipe) user: CreateUserDto) {
    return await this.userService.CreateUser(user);
  }

  @Patch('/:id')
  async updateUserInfo(
    @Body(ValidationPipe) user: UpdateUserDto,
    @Param('id') id: string,
  ) {
    return await this.userService.updateUserInfo(id, user);
  }

  @Put('/:id/deactivate')
  async deActivateUser(@Param('id') id: string) {
    return await this.userService.deActivateUser(id);
  }
}
