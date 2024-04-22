import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ReportType } from 'src/reportType/schema/reportType.schema';
import { User } from 'src/user/schema/user.schema';
import { VoucherSell } from 'src/voucher-sell/schema/voucher-sell.schema';

export type ReportDocument = Report & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Report {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VoucherSell',
    required: true,
  })
  voucherSell: VoucherSell;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReportType',
    required: true,
  })
  reportType: ReportType;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  staff: User;

  @Prop({ required: true })
  userMessage: string;

  @Prop()
  staffMessage: string;
}
export const ReportSchema = SchemaFactory.createForClass(Report);
