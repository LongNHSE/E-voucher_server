import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseFilters,
} from '@nestjs/common';
import { invoiceService } from './invoice.service';
import { Invoice } from './schema/invoice.schema';
import { MongooseExceptionFilter } from 'src/filters/mongoose-exception.filter';
import { VoucherSell } from 'src/voucher-sell/schema/voucher-sell.schema';

@Controller('invoices')
@UseFilters(MongooseExceptionFilter)
export class invoiceController {
  constructor(private readonly invoiceService: invoiceService) {}

  @Get()
  async findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }

  @Post()
  async purchase(
    @Body('userId') userId: string,
    @Body('voucherId') voucherId: string,
    @Body('quantity') quantity: number,
    @Body('giftUserId') giftUserId: string,
  ): Promise<Invoice> {
    return this.invoiceService.purchase(
      userId,
      voucherId,
      quantity,
      giftUserId,
    );
  }

  @Get('totalRevenue') // Define route path without parameter in URL path
  async getTotalRevenue(
    @Query('hostId') hostId: string, // Extract hostId from query string
  ): Promise<{ totalRevenue: number }> {
    console.log('hostId:', hostId); // Place console.log() statement here

    const totalRevenue =
      await this.invoiceService.getTotalRevenueForHost(hostId);
    return { totalRevenue };
  }
}
