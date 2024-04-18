import { InjectModel } from '@nestjs/mongoose';
import { Voucher, VoucherDocument } from './schema/voucher.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { uploadImage } from 'src/common/util/FirebaseUtil';

@Injectable()
export class VoucherService {
  constructor(
    @InjectModel(Voucher.name) private voucherModel: Model<VoucherDocument>,
  ) {}

  async search(
    name: string,
    code: string,
    status: string,
    host: string,
    staff: string,
  ): Promise<Voucher[]> {
    return await this.voucherModel.find({
      name: { $regex: name, $options: 'i' },
      code: { $regex: code, $options: 'i' },
      status: { $regex: status, $options: 'i' },
      host: { $regex: host, $options: 'i' },
      staff: { $regex: staff, $options: 'i' },
    });
  }

  async findAll(): Promise<Voucher[]> {
    return await this.voucherModel.find().exec();
  }

  async findOne(id: string): Promise<Voucher> {
    return await this.voucherModel.findById(id);
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

  async addVoucherImage(file: File): Promise<string> {
    return await uploadImage(file);
  }
}
