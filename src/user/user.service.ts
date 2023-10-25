import { BadRequestException, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repositroy';
import { CreateUserDto } from './dtos/create-user.dto';
import { ERROR_CODES } from '../constants/error-codes';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // event : user.created -> send welcome email
  async CreateUser(user: CreateUserDto): Promise<User> {
    if (await this.userRepository.findOne({ email: user.email }))
      throw new BadRequestException(ERROR_CODES.USER_ALREADY_EXISTS);
    this.eventEmitter.emit('user.created', user); // event
    return await this.userRepository.create(user);
  }

  // event : user.info.updated -> send notification
  async updateUserInfo(userId: any, user: UpdateUserDto): Promise<User> {
    if (await this.userRepository.findOne({ email: user.email }))
      throw new BadRequestException(ERROR_CODES.USER_ALREADY_EXISTS);
    this.eventEmitter.emit('user.info.updated', user); // event
    return await this.userRepository.update(
      {
        _id: userId,
      },
      user,
    );
  }

  // event : user.status.deactivated -> send notification , email
  async deActivateUser(userId: string) {
    if (!(await this.userRepository.findOne({ _id: userId })))
      throw new BadRequestException(ERROR_CODES.DATA_NOT_FOUND);

    const deacUser = await this.userRepository.update(
      { _id: userId },
      { status: 'in-active' },
    );
    if (!deacUser) throw new BadRequestException(ERROR_CODES.UNEXPECTED_ERROR);
    this.eventEmitter.emit('user.status.deactivated', deacUser); // event
    return {
      data: ERROR_CODES.USER_DEACTIVATED,
    };
  }
}
