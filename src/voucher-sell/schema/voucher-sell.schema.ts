import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schema/user.schema';
import { Voucher } from 'src/voucher/schema/voucher.schema';

export type VoucherSellDocument = VoucherSell & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class VoucherSell {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Voucher',
    required: true,
  })
  voucherId: Voucher | mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User | mongoose.Types.ObjectId;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }],
  })
  giftUserId: User[] | mongoose.Types.ObjectId[];

  @Prop({ enum: ['pending', 'used'], default: 'pending' })
  status: string;

  @Prop()
  hash: string;

  @Prop()
  generateAt: Date;
}

export const voucherSellSchema = SchemaFactory.createForClass(VoucherSell);
