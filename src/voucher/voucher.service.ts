import { InjectModel } from '@nestjs/mongoose';
import { Voucher, VoucherDocument } from './schema/voucher.schema';
import { FilterQuery, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { VoucherSell } from 'src/voucher-sell/schema/voucher-sell.schema';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(VoucherSell.name) private voucherSellModel: Model<VoucherSell>,
  ) {}

  async searchForUser(
    name: string,
    category: string,
    code: string,
    status: string,
    host: string,
    staff: string,
    startSellTime: Date,
    endSellTime: Date,
  ): Promise<Voucher[]> {
    startSellTime
      ? (startSellTime = new Date(startSellTime))
      : (startSellTime = new Date());
    endSellTime
      ? (endSellTime = new Date(endSellTime))
      : (endSellTime = new Date());
    console.log(
      name,
      category,
      code,
      status,
      host,
      staff,
      startSellTime,
      endSellTime,
    );
    const filterQuery: FilterQuery<Voucher> = {
      $or: [
        {
          name: { $regex: name || '', $options: 'i' },
        },
      ],
      category: { $regex: category || '', $options: 'i' },
      code: { $regex: code || '', $options: 'i' },
      status: status,
      startSellTime: { $lte: startSellTime },
      endSellTime: { $gte: endSellTime },
    };
    console.log(filterQuery);
    return await this.voucherModel.find(filterQuery).sort({ createdAt: -1 });
  }

  async findAll(): Promise<Voucher[]> {
    console.log(this.voucherModel.find());

    return await this.voucherModel.find().populate('host');
  }

  async findOne(id: string): Promise<Voucher> {
    return await this.voucherModel.findById(id).populate('host');
  }

  async create(voucher: Voucher): Promise<Voucher> {
    const newVoucher = new this.voucherModel(voucher);
    return await newVoucher.save();
  }

  async update(id: string, voucher: Voucher): Promise<Voucher> {
    return await this.voucherModel.findByIdAndUpdate(id, voucher, {
      new: true,
    });
  }

  async delete(id: string): Promise<Voucher> {
    return await this.voucherModel.findByIdAndDelete(id);
  }

  async findByVoucherStatus(statuses: string[]): Promise<Voucher[]> {
    return await this.voucherModel
      .find({ status: { $in: statuses } })
      .populate('host')
      .populate('staff');
  }

  async updateVoucherStatus(
    id: string,
    status: string,
    rejectReason: string | null,
  ): Promise<Voucher> {
    return await this.voucherModel
      .findByIdAndUpdate(
        id,
        { status: status, rejectReason: rejectReason || null },
        { new: true },
      )
      .exec();
  }
}
