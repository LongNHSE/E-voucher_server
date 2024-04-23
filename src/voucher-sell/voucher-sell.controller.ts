import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { VoucherSell } from './schema/voucher-sell.schema';
import { voucherSellService } from './voucher-sell.service';
import { Voucher } from 'src/voucher/schema/voucher.schema';
import { SocketService } from './../gateway/socket.service';

@Controller('voucherSell')
export class VoucherSellController {
  constructor(
    private readonly voucherSellService: voucherSellService,
    private readonly socketService: SocketService,
  ) {}

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
    @Query('status') status: string,
  ): Promise<VoucherSell[]> {
    return this.voucherSellService.findByUserIdAndVoucherId(
      userId,
      voucherId,
      status,
    );
  }

  @Get()
  async findAll(): Promise<VoucherSell[]> {
    return this.voucherSellService.findAll();
  }

  @Post()
  async create(@Body() voucherSell: VoucherSell): Promise<VoucherSell> {
    return this.voucherSellService.create(voucherSell);
  }
  @Post('generateQRCode')
  async generateQRCode(@Body() body: any) {
    const { voucherId } = body;
    let voucherSell = await this.voucherSellService.findOneById(voucherId);
    if (!voucherSell) {
      throw new HttpException('Voucher not found', HttpStatus.CONFLICT);
    }
    voucherSell = await this.voucherSellService.generateQRCode(voucherId);
    // this.socketService.handleJoinRoom
    return {
      statusCode: 200,
      message: 'Voucher scanned successfully',
      voucher: voucherSell,
    };
  }

  // Use to scan QR code and update status of voucher
  @Post('QRCode')
  async QRCode(@Body() body: any) {
    const { voucherId, hash } = body;
    console.log(voucherId, hash);
    if (!voucherId || !hash) {
      throw new HttpException('Invalid QRCode', HttpStatus.CONFLICT);
    }
    let voucherSell = await this.voucherSellService.findOneById(voucherId);
    if (!voucherSell) {
      throw new HttpException('Voucher not found', HttpStatus.CONFLICT);
    }
    if (voucherSell.status === 'used') {
      throw new HttpException('Voucher has been used', HttpStatus.CONFLICT);
    }
    if (
      voucherSell.status === 'pending' &&
      voucherSell.generateAt.getTime() + 1000 * 60 * 5 < new Date().getTime()
    ) {
      throw new Error('QR code has been expired');
    }
    if (voucherSell.hash !== hash) {
      throw new HttpException('Invalid QRCode', HttpStatus.CONFLICT);
    }
    console.log((voucherSell.voucherId as Voucher).endUseTime);
    if ((voucherSell.voucherId as Voucher).endUseTime < new Date()) {
      throw new HttpException('Voucher has expired', HttpStatus.CONFLICT);
    }
    voucherSell = await this.voucherSellService.ScanQRCode(voucherId);
    return {
      statusCode: 200,
      message: 'Voucher scanned successfully',
      voucher: voucherSell,
    };
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
