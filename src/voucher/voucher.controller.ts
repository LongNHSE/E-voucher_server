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
import { ResponseObject } from 'src/common/ResponseObject';

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
    return this.voucherService.searchForUser(
      name,
      category,
      code,
      status,
      host,
      staff,
    );
  }

  @Post('status')
  async findByVoucherStatus(
    @Body('status') statuses: string[],
  ): Promise<ResponseObject> {
    const vouchers: Voucher[] =
      await this.voucherService.findByVoucherStatus(statuses);
    if (vouchers.length === 0) {
      return ResponseObject.badReqError('No voucher found');
    }
    return new ResponseObject(200, 'Success', vouchers);
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
}
