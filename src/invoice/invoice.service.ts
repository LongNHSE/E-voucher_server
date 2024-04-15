import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Invoice, InvoiceDocument } from './schema/invoice.schema';

@Injectable()
export class invoiceService {
  constructor(
    @InjectModel(Invoice.name)
    private invoiceModel: Model<InvoiceDocument>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    return await this.invoiceModel.find().exec();
  }
}
