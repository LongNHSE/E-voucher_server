import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { Voucher } from './schema/voucher.schema';
import { voucherService } from './voucher.service';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: voucherService) {}

  @Get()
  async findAll(): Promise<Voucher[]> {
    return this.voucherService.findAll();
  }

  @Get('status')
  async findByVoucherStatus(): Promise<Voucher[]> {
    return this.voucherService.findByVoucherStatus();
  }

  @Patch(':id')
  async updateVoucherStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ): Promise<Voucher> {
    return this.voucherService.updateVoucherStatus(id, status);
  }
}
