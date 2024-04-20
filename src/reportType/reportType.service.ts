import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ReportType, ReportTypeDocument } from './schema/reportType.schema';
import { Model } from 'mongoose';

@Injectable()
export class ReportTypeService {
  constructor(
    @InjectModel(ReportType.name)
    private reportTypeModel: Model<ReportTypeDocument>,
  ) {}

  async findAll(): Promise<ReportType[]> {
    return await this.reportTypeModel.find().exec();
  }

  async create(reportType: ReportType): Promise<ReportType> {
    const newReportType = new this.reportTypeModel(reportType);
    return await newReportType.save();
  }

  async delete(id: string): Promise<ReportType> {
    return await this.reportTypeModel.findByIdAndDelete(id);
  }
}
