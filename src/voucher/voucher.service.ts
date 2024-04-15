import { InjectModel } from '@nestjs/mongoose';
import { Voucher, VoucherDocument } from './schema/voucher.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class voucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
  ) {}

  async findAll(): Promise<Voucher[]> {
    return await this.voucherModel.find().exec();
  }

  async findByVoucherStatus(): Promise<Voucher[]> {
    return await this.voucherModel
      .find({ status: { $in: ['pending', 'reject'] } })
      .exec();
  }

  async updateVoucherStatus(id: string, status: string): Promise<Voucher> {
    return await this.voucherModel
      .findByIdAndUpdate(id, { status: status }, { new: true })
      .exec();
  }
}
