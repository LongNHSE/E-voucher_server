import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { VoucherSell } from 'src/voucher-sell/schema/voucher-sell.schema';

export type InvoiceDocument = Invoice & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Invoice {
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'VoucherSell' }],
    required: true,
  })
  VoucherSell: VoucherSell[];

  @Prop({ required: true })
  total: number;
}

export const invoiceSchema = SchemaFactory.createForClass(Invoice);
