import { Controller, Get } from '@nestjs/common';
import { VoucherSell } from './schema/voucher-sell.schema';
import { voucherSellService } from './voucher-sell.service';

@Controller('voucherSell')
export class VoucherSellController {
  constructor(private readonly voucherSellService: voucherSellService) {}

  @Get()
  async findAll(): Promise<VoucherSell[]> {
    return this.voucherSellService.findAll();
  }
}
