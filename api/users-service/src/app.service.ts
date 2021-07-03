import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersDto } from './new-users.dto';
import { Users } from './users.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Users') private readonly usersModel: Model<Users>,
  ) {}

  async create(user: UsersDto): Promise<Users> {
    user.createdAt = new Date();
    user.updatedAt = new Date();
    const createdUser = new this.usersModel(user);
    return await createdUser.save();
  }

  async findOneBy({ email }): Promise<Users> {
    return this.usersModel.findOne({ email });
  }
}
