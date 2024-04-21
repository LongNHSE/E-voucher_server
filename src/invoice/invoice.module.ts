import { Module } from '@nestjs/common';
import { invoiceController } from './invoice.controller';
import { invoiceService } from './invoice.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Invoice, invoiceSchema } from './schema/invoice.schema';
import { voucherSellService } from 'src/voucher-sell/voucher-sell.service';
import {
  VoucherSell,
  voucherSellSchema,
} from 'src/voucher-sell/schema/voucher-sell.schema';
import { User, userSchema } from 'src/user/schema/user.schema';
import { Voucher, voucherSchema } from 'src/voucher/schema/voucher.schema';

@Module({
  controllers: [invoiceController],
  providers: [invoiceService, voucherSellService],
  imports: [
    MongooseModule.forFeature([
      { name: Invoice.name, schema: invoiceSchema },
      { name: User.name, schema: userSchema },
      { name: Voucher.name, schema: voucherSchema },
      { name: VoucherSell.name, schema: voucherSellSchema },
    ]),
  ],
})
export class InvoiceModule {}
