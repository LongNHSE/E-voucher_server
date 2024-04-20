import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  checkExistedEmail(email: string) {
    return this.userModel.findOne({
      email: email,
    });
  }
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userModel.findOne({ email }).exec();
  }

  async createUser(createUserDTO: CreateUserDto): Promise<User> {
    const newUser = new this.userModel({ ...createUserDTO });
    return await newUser.save();
  }
}
