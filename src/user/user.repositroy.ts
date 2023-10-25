import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UserRepository {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async create(user: any): Promise<User> {
    return await this.userModel.create(user);
  }

  update(filter: any, data: any): Promise<User> {
    return this.userModel.findOneAndUpdate(filter, data, {
      new: true,
    });
  }

  findOne(filter: any): Promise<User> {
    return this.userModel.findOne(filter);
  }
}
