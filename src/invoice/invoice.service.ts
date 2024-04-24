import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Invoice, InvoiceDocument } from './schema/invoice.schema';
import {
  VoucherSell,
  VoucherSellDocument,
} from 'src/voucher-sell/schema/voucher-sell.schema';
import { Voucher, VoucherDocument } from 'src/voucher/schema/voucher.schema';
import { log } from 'console';

@Injectable()
export class invoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private invoiceModel: Model<InvoiceDocument>,
    @InjectModel(VoucherSell.name)
    private voucherSellModel: Model<VoucherSellDocument>,
    @InjectModel(Voucher.name)
    private voucherModel: Model<VoucherDocument>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceModel
      .find()
      .populate('VoucherSell')
      .populate({
        path: 'VoucherSell',
        populate: { path: 'voucherId' },
      })
      .exec();
  }

  async purchase(
    userId: string,
    voucherId: string,
    quantity: number,
    giftUserId: string,
  ): Promise<Invoice> {
    const newVoucherSells: VoucherSell[] = [];
    let total = 0;
    console.log('quantity', quantity);

    for (let i: number = 0; i < quantity; i++) {
      const newVoucherSell: VoucherSell = new this.voucherSellModel();
      newVoucherSell.userId = new mongoose.Types.ObjectId(userId);
      newVoucherSell.voucherId = new mongoose.Types.ObjectId(voucherId);
      console.log('time', i);

      if (giftUserId) {
        newVoucherSell.giftUserId = new mongoose.Types.ObjectId(giftUserId);
      }
      console.log('---newvouchersell', newVoucherSell);

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

    const voucher = await this.voucherModel.findOne({ _id: voucherId });

    voucher.quantity = voucher.quantity - quantity;
    console.log('----voucher quantity', voucher.quantity);

    await voucher.save();

    return savedInvoice;
  }
  // async getTotalRevenueForHost(hostId: string): Promise<number> {
  //   const totalRevenueResult = await this.invoiceModel.aggregate([
  //     {
  //       $lookup: {
  //         from: 'vouchersells',
  //         localField: 'VoucherSell',
  //         foreignField: '_id',
  //         as: 'voucherSells',
  //       },
  //     },
  //     {
  //       $unwind: '$voucherSells',
  //     },
  //     {
  //       $lookup: {
  //         from: 'vouchers',
  //         localField: 'voucherSells.voucherId',
  //         foreignField: '_id',
  //         as: 'voucher',
  //       },
  //     },
  //     {
  //       $unwind: '$voucher',
  //     },
  //     {
  //       $match: {
  //         'voucher.host': new mongoose.Types.ObjectId(hostId),
  //       },
  //     },

  //     {
  //       $group: {
  //         _id: null,
  //         totalRevenue: { $sum: '$total' },
  //       },
  //     },
  //   ]);
  //   return totalRevenueResult.length > 0
  //     ? totalRevenueResult[0].totalRevenue
  //     : 0;
  // }
  async getTotalRevenueForHost(hostId: string): Promise<number> {
    const invoices = await this.invoiceModel.find().populate({
      path: 'VoucherSell',
      populate: {
        path: 'voucherId',
      },
    });

    const totalRevenue = invoices.reduce((total, invoice) => {
      const revenueForInvoice = invoice.VoucherSell.reduce(
        (totalForVoucherSell, voucherSell) => {
          if (voucherSell.voucherId instanceof mongoose.Types.ObjectId) {
            return totalForVoucherSell;
          }
          const voucher = voucherSell.voucherId as Voucher;
          if (voucher.host.toString() === hostId) {
            return totalForVoucherSell + voucherSell.voucherId.price;
          }
          return totalForVoucherSell;
        },
        0,
      );
      return total + revenueForInvoice;
    }, 0);

    return totalRevenue;
  }
}
