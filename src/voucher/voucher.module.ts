import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { Mongoose } from 'mongoose';
import { Voucher, voucherSchema } from './schema/voucher.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService],
  imports: [
    MongooseModule.forFeature([{ name: Voucher.name, schema: voucherSchema }]),
  ],
})
export class VoucherModule {}
