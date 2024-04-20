import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { VoucherSell } from './schema/voucher-sell.schema';
import { voucherSellService } from './voucher-sell.service';

@Controller('voucherSell')
export class VoucherSellController {
  constructor(private readonly voucherSellService: voucherSellService) {}

  @Get()
  async findAll(): Promise<VoucherSell[]> {
    return this.voucherSellService.findAll();
  }

  @Post()
  async create(@Body() voucherSell: VoucherSell): Promise<VoucherSell> {
    return this.voucherSellService.create(voucherSell);
  }
  // @Get('QRCode')
  // async QRCode(@Body() body: any) {
  //   return this.voucherSellService.QRCode(body);
  // }

  @Post('QRCode')
  async QRCode(@Body() body: any) {
    console.log(body);
    const { voucherId } = body;
    console.log(voucherId);
    const voucherSell = await this.voucherSellService.findOneById(voucherId);
    if (!voucherSell) {
      throw new HttpException('Voucher not found', HttpStatus.CONFLICT);
    }
    if (voucherSell.status === 'used') {
      throw new HttpException('Voucher has been used', HttpStatus.CONFLICT);
    }
    // if (
    //   voucherSell.status === 'pending' &&
    //   voucherSell.generateAt.getTime() + 1000 * 60 * 5 < new Date().getTime()
    // ) {
    //   throw new Error('Voucher has been expired');
    // }
    return {
      statusCode: 200,
      message: 'Voucher scanned successfully',
      voucher: voucherSell,
    };
  }
}
