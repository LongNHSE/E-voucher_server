import { Module } from '@nestjs/common';
import { VoucherSellController } from './voucher-sell.controller';
import { voucherSellService } from './voucher-sell.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VoucherSell, voucherSellSchema } from './schema/voucher-sell.schema';

@Module({
  controllers: [VoucherSellController],
  providers: [voucherSellService],
  imports: [
    MongooseModule.forFeature([
      { name: VoucherSell.name, schema: voucherSellSchema },
    ]),
  ],
})
export class VoucherSellModule {}
