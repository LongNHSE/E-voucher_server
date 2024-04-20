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

@Controller('vouchers')
export class VoucherController {
  constructor(private readonly voucherService: VoucherService) {}

  @Get()
  async findAll(): Promise<Voucher[]> {
    return this.voucherService.findAll();
  }

  @Get('search')
  async search(
    @Query() query: any,
    // name: string,
    // code: string,
    // status: string,
    // host: string,
    // staff: string,
  ): Promise<Voucher[]> {
    console.log(query);
    const { name, category, code, status, host, staff } = query;
    console.log(name, category, code, status, host, staff);
    return this.voucherService.search(
      name,
      category,
      code,
      status,
      host,
      staff,
    );
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
