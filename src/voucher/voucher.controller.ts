import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Voucher } from './schema/voucher.schema';
import { VoucherService } from './voucher.service';

@Controller('voucher')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get()
  async findAll(): Promise<Voucher[]> {
    return this.voucherService.findAll();
  }

  @Get()
  async search(
    @Query() query: any,
    // name: string,
    // code: string,
    // status: string,
    // host: string,
    // staff: string,
  ): Promise<Voucher[]> {
    const { name, code, status, host, staff } = query;
    return this.voucherService.search(name, code, status, host, staff);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Voucher> {
    return this.voucherService.findOne(id);
  }

  @Post()
  async create(@Body() voucher: Voucher): Promise<Voucher> {
    return this.voucherService.create(voucher);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() voucher: Voucher,
  ): Promise<Voucher> {
    return this.voucherService.update(id, voucher);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Voucher> {
    return this.voucherService.delete(id);
  }

  @Get('status')
  async findByVoucherStatus(): Promise<Voucher[]> {
    return this.voucherService.findByVoucherStatus();
  }
}
