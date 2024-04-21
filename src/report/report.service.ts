import { InjectModel } from '@nestjs/mongoose';
import { Report, ReportDocument } from './schema/report.schema';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class reportService {
  constructor(
    @InjectModel(Report.name) private reportModel: Model<ReportDocument>,
  ) {}

  async findAll(): Promise<Report[]> {
    return await this.reportModel.find().exec();
  }
}
