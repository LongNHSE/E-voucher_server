import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReportType } from './schema/reportType.schema';
import { ReportTypeService } from './reportType.service';
import { ResponseObject } from 'src/common/ResponseObject';

@Controller('reportType')
export class ReportTypeController {
  constructor(private readonly reportTypeService: ReportTypeService) {}
  @Get()
  async findAll(): Promise<ResponseObject> {
    return ResponseObject.success(await this.reportTypeService.findAll());
    // return this.reportTypeService.findAll();
  }
  @Post()
  async create(@Body() reportType: ReportType): Promise<ReportType> {
    return this.reportTypeService.create(reportType);
  }
  @Delete(':id')
  async delete(@Param('id') id: string): Promise<ReportType> {
    return this.reportTypeService.delete(id);
  }
}
