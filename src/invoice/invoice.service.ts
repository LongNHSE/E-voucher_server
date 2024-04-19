import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Invoice, InvoiceDocument } from './schema/invoice.schema';
import {
  VoucherSell,
  VoucherSellDocument,
} from 'src/voucher-sell/schema/voucher-sell.schema';
import { Voucher } from 'src/voucher/schema/voucher.schema';

@Injectable()
export class invoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private invoiceModel: Model<InvoiceDocument>,
    @InjectModel(VoucherSell.name)
    private voucherSellModel: Model<VoucherSellDocument>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceModel.find().populate('VoucherSell').exec();
  }

  async purchase(
    userId: string,
    voucherId: string,
    quantity: number,
  ): Promise<Invoice> {
    const newVoucherSells: VoucherSell[] = [];
    let total = 0;

    for (let i: number = 0; i < quantity; i++) {
      const newVoucherSell: VoucherSell = new this.voucherSellModel();
      newVoucherSell.userId = new mongoose.Types.ObjectId(userId);
      newVoucherSell.voucherId = new mongoose.Types.ObjectId(voucherId);

      const savedVoucherSell =
        await this.voucherSellModel.create(newVoucherSell);
      const populatedVoucherSell = await savedVoucherSell.populate('voucherId');
      const voucher: Voucher = populatedVoucherSell.voucherId as Voucher;

      total += voucher.price;

      newVoucherSells.push(newVoucherSell);
    }

    const newInvoice: Invoice = new this.invoiceModel();

    newInvoice.VoucherSell = newVoucherSells;
    newInvoice.total = total;

    const savedInvoice = await this.invoiceModel.create(newInvoice);

    return savedInvoice;
  }
}
