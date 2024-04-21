import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { VoucherSell } from './schema/voucher-sell.schema';
import { voucherSellService } from './voucher-sell.service';
import { Voucher } from 'src/voucher/schema/voucher.schema';

@Controller('voucherSell')
export class VoucherSellController {
  constructor(private readonly voucherSellService: voucherSellService) {}

  @Get('voucherByUserId')
  async findVoucherByUserId(
    @Query('userId') userId: string,
  ): Promise<Voucher[]> {
    return this.voucherSellService.findVoucherByUserId(userId);
  }

  @Get('search')
  async findByUserIdAndVoucherId(
    @Query('userId') userId: string,
    @Query('voucherId') voucherId: string,
  ): Promise<VoucherSell[]> {
    return this.voucherSellService.findByUserIdAndVoucherId(userId, voucherId);
  }

  @Get()
  async findAll(): Promise<VoucherSell[]> {
    return this.voucherSellService.findAll();
  }

  @Post()
  async create(@Body() voucherSell: VoucherSell): Promise<VoucherSell> {
    return this.voucherSellService.create(voucherSell);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<VoucherSell> {
    return this.voucherSellService.findOne(id);
  }

  @Get('userId')
  async findByUserId(@Query('userId') userId: string): Promise<VoucherSell[]> {
    return this.voucherSellService.findByUserId(userId);
  }

  @Get('voucherId')
  async findByVoucherId(
    @Query('voucherId') voucherId: string,
  ): Promise<VoucherSell[]> {
    return this.voucherSellService.findByVoucherId(voucherId);
  }

  @Post('update/:id')
  async update(
    @Param('id') id: string,
    @Body() voucherSell: VoucherSell,
  ): Promise<VoucherSell> {
    return this.voucherSellService.update(id, voucherSell);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<VoucherSell> {
    return this.voucherSellService.delete(id);
  }
}
