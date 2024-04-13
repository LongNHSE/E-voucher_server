import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './shcema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async createUser(createUserDTO: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({ ...createUserDTO });
    return await newUser.save();
  }
}
