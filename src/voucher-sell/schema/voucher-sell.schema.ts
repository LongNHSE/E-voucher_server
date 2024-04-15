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
  voucherId: Voucher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: User;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }],
    required: true,
  })
  giftUserId: User[];

  @Prop({ enum: ['pending', 'used'], default: 'pending' })
  status: string;

  @Prop()
  hash: string;
}

export const voucherSellSchema = SchemaFactory.createForClass(Voucher);
