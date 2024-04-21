import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Report } from './schema/report.schema';
import {
  VoucherSell,
  VoucherSellDocument,
} from 'src/voucher-sell/schema/voucher-sell.schema';
import { ReportDocument } from './schema/report.schema';

@Injectable()
export class ReportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(VoucherSell.name)
    private voucherSellModel: Model<VoucherSellDocument>,
  ) {}

  async create(report: Report): Promise<Report> {
    const newReport = new this.reportModel(report);
    return await newReport.save();
  }
  async findAll(): Promise<Report[]> {
    return await this.reportModel
      .find()
      .populate({
        path: 'voucherSell',
        populate: {
          path: 'voucherId',
        },
      })
      .populate('reportType')
      .populate('user')
      .populate('staff');
  }
  async findByStaff(): Promise<Report[]> {
    return await this.reportModel
      .find({ staff: null, staffMessage: null })
      .populate({
        path: 'voucherSell',
        populate: {
          path: 'voucherId',
        },
      })
      .populate('reportType')
      .populate('user')
      .populate('staff');
  }
  async findOne(id: string): Promise<Report> {
    return (await this.reportModel.findById(id))
      .populated('voucherSell')
      .populate('reportType')
      .populate('user')
      .populate('staff')
      .exec();
  }
  async update(id: string, report: Report): Promise<Report> {
    return await this.reportModel.findByIdAndUpdate(id, report, { new: true });
  }
}
