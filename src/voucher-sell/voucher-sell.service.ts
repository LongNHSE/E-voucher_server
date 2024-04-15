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
    return await this.voucherSellModel.find().exec();
  }
}
