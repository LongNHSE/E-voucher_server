import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Voucher } from './schema/voucher.schema';
import { VoucherService } from './voucher.service';
import { ResponseObject } from 'src/common/ResponseObject';
import { uploadImage } from 'src/common/util/FirebaseUtil';
import { FileInterceptor } from '@nestjs/platform-express';
import { log } from 'console';
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
  @Get('totalQuantity')
  async getTotalQuantity(): Promise<number> {
    console.log('123123');
    return await this.voucherService.calculateTotalQuantity();
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

  @Patch(':id/status')
  async updateVoucherStatus(
    @Param('id') id: string,
    @Body() voucher: Voucher,
  ): Promise<ResponseObject> {
    const { status, rejectReason } = voucher;
    console.log(status, rejectReason);
    const updateVoucherStatus = await this.voucherService.updateVoucherStatus(
      id,
      status,
      rejectReason || null,
    );
    if (!updateVoucherStatus)
      return ResponseObject.badReqError("Can't update voucher status");
    return ResponseObject.success(updateVoucherStatus);
  }

  @Post('image')
  @UseInterceptors(FileInterceptor('image'))
  async addImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({ fileType: 'image/*' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ): Promise<ResponseObject> {
    console.log(file);
    const updateVoucherImage = await uploadImage(file);
    if (!updateVoucherImage)
      return ResponseObject.badReqError("Can't update voucher image");
    return ResponseObject.success(updateVoucherImage);
  }
}
