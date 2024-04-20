import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { VoucherSell, VoucherSellDocument } from './schema/voucher-sell.schema';

@Injectable()
export class voucherSellService {
  constructor(
    @InjectModel(VoucherSell.name)
    private voucherSellModel: Model<VoucherSellDocument>,
  ) {}

  async findAll(): Promise<VoucherSell[]> {
    return await this.voucherSellModel
      .find()
      .populate('userId')
      .populate('voucherId')
      .exec();
  }

  async create(voucherSell: VoucherSell): Promise<VoucherSell> {
    const newVoucherSell = new this.voucherSellModel(voucherSell);
    return await newVoucherSell.save();
  }

  async findOne(query: any): Promise<VoucherSell> {
    return await this.voucherSellModel.findOne(query).exec();
  }

  async findOneById(id: string): Promise<VoucherSell> {
    return await this.voucherSellModel.findById(id).exec();
  }

  async ScanQRCode(_id: string): Promise<VoucherSell> {
    return await this.voucherSellModel
      .findByIdAndUpdate(_id, { status: 'used' }, { new: true })
      .exec();
  }
}
