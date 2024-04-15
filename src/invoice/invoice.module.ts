import { Module } from '@nestjs/common';
import { invoiceController } from './invoice.controller';
import { invoiceService } from './invoice.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, invoiceSchema } from './schema/invoice.schema';

@Module({
  controllers: [invoiceController],
  providers: [invoiceService],
  imports: [
    MongooseModule.forFeature([{ name: Invoice.name, schema: invoiceSchema }]),
  ],
})
export class VoucherModule {}
