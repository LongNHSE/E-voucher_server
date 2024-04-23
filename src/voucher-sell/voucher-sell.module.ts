import { Module } from '@nestjs/common';
import { VoucherSellController } from './voucher-sell.controller';
import { voucherSellService } from './voucher-sell.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherSell, voucherSellSchema } from './schema/voucher-sell.schema';
import { UserModule } from 'src/user/user.module';
import { VoucherService } from 'src/voucher/voucher.service';
import { User, userSchema } from 'src/user/schema/user.schema';
import { Voucher, voucherSchema } from 'src/voucher/schema/voucher.schema';
import { UserService } from 'src/user/user.service';
import { SocketModule } from 'src/gateway/socket.module';

@Module({
  controllers: [VoucherSellController],
  providers: [voucherSellService, VoucherService, UserService],
  imports: [
    UserModule,
    SocketModule,
    MongooseModule.forFeature([
      { name: VoucherSell.name, schema: voucherSellSchema },
      { name: User.name, schema: userSchema },
      { name: Voucher.name, schema: voucherSchema },
    ]),
  ],
})
export class VoucherSellModule {}
