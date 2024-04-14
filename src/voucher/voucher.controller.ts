import { Controller, Get } from '@nestjs/common';
import { Voucher } from './schema/voucher.schema';
import { voucherService } from './voucher.service';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: voucherService) {}

  @Get()
  async findAll(): Promise<Voucher[]> {
    return this.voucherService.findAll();
  }
}
