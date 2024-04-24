import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ReportType } from './schema/reportType.schema';
import { ReportTypeService } from './reportType.service';
import { ResponseObject } from 'src/common/ResponseObject';

@Controller('reportTypes')
export class ReportTypeController {
  constructor(private readonly reportTypeService: ReportTypeService) {}
  @Get()
  async findAll(): Promise<ResponseObject> {
    return ResponseObject.success(await this.reportTypeService.findAll());
    // return this.reportTypeService.findAll();
  }
  @Post()
  async create(@Body() reportType: ReportType): Promise<ResponseObject> {
    return ResponseObject.success(
      await this.reportTypeService.create(reportType),
    );
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ResponseObject> {
    return ResponseObject.success(await this.reportTypeService.delete(id));
  }
}
