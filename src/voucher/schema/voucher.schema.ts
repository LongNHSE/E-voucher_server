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
  name: string;

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
    default: 'pending',
    enum: ['pending', 'reject', 'available', 'unavaible'],
  })
  status: string;

  @Prop({ required: true })
  startSellTime: Date;

  @Prop({ required: true })
  endSellTime: Date;

  @Prop({})
  description: string;

  @Prop({})
  imageUrl: string;

  @Prop({ default: [] })
  condition: [string];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  host: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user' })
  staff: User;

  @Prop({})
  rejectReason: string;
}

export const voucherSchema = SchemaFactory.createForClass(Voucher);
