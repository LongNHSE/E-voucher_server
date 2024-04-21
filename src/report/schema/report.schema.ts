import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from '../../user/shcema/user.schema';

export type ReportDocument = Report & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Report {
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  //   voucherSell: voucherSell;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  staff: User;

  @Prop({ required: true })
  userMessage: string;

  @Prop({ required: true })
  staffMessage: [string];
}

export const reportSchema = SchemaFactory.createForClass(Report);
