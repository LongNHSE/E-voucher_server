import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { voucherService } from './voucher.service';
import { Mongoose } from 'mongoose';
import { Voucher, voucherSchema } from './schema/voucher.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [VoucherController],
  providers: [voucherService],
  imports: [
    MongooseModule.forFeature([{ name: Voucher.name, schema: voucherSchema }]),
  ],
})
export class VoucherModule {}
