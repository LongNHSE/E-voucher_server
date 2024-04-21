import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { Mongoose } from 'mongoose';
import { Voucher, voucherSchema } from './schema/voucher.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { User, userSchema } from 'src/user/schema/user.schema';
import { UserModule } from 'src/user/user.module';
import { VoucherSellModule } from 'src/voucher-sell/voucher-sell.module';
import {
  VoucherSell,
  voucherSellSchema,
} from 'src/voucher-sell/schema/voucher-sell.schema';
import { voucherSellService } from 'src/voucher-sell/voucher-sell.service';
import { FirebaseService } from 'src/auth/firebase/firebase.service';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService, voucherSellService, UserService, FirebaseService],
  imports: [
    VoucherSellModule,
    MongooseModule.forFeature([
      { name: Voucher.name, schema: voucherSchema },
      {
        name: User.name,
        schema: userSchema,
      },
      { name: VoucherSell.name, schema: voucherSellSchema },
    ]),
  ],
})
export class VoucherModule {}
