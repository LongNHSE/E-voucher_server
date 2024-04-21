import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TimeLimit, TimeLimitDocument } from './schema/timeLimit.schema';
import { Model } from 'mongoose';

@Injectable()
export class TimeLimitService {
  constructor(
    @InjectModel(TimeLimit.name)
    private timeLimitModel: Model<TimeLimitDocument>,
  ) {}

  async findAll(): Promise<TimeLimit[]> {
    return await this.timeLimitModel.find().exec();
  }
  async find(duration: number): Promise<TimeLimit[]> {
    return await this.timeLimitModel.find({ duration }).exec();
  }
  async findByIsActive(isActive: boolean): Promise<TimeLimit[]> {
    return await this.timeLimitModel.find({ isActive }).exec();
  }
  async create(timeLimit: TimeLimit): Promise<TimeLimit> {
    return await new this.timeLimitModel(timeLimit).save();
  }
  async update(id: string, duration: number): Promise<TimeLimit> {
    return await this.timeLimitModel
      .findByIdAndUpdate(id, { duration }, { new: true })
      .exec();
  }
}
