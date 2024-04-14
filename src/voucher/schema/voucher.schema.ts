import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schema/user.schema';

export type VoucherDocument = Voucher & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Voucher {
  @Prop({ required: true })
  code: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  startUseTime: Date;

  @Prop({ required: true })
  endUseTime: Date;

  @Prop({ required: true })
  discount: number;

  @Prop({ required: true })
  discountType: string;

  @Prop({ required: true })
  price: number;

  @Prop({
    required: true,
    enum: ['pending', 'reject', 'available', 'unavaible'],
  })
  status: string;

  @Prop({ required: true })
  startSellTime: Date;

  @Prop({ required: true })
  endSellTime: Date;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop({ required: true })
  condition: [string];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  host: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
  staff: User;

  @Prop({ required: true })
  rejectReason: string;
}

export const voucherSchema = SchemaFactory.createForClass(Voucher);
