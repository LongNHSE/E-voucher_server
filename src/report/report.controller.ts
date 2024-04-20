import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ReportService } from './report.service';
import { ResponseObject } from 'src/common/ResponseObject';
import { Report } from './schema/report.schema';

@Controller('reports')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get()
  async findAll(): Promise<ResponseObject> {
    return ResponseObject.success(await this.reportService.findAll());
  }
  @Get(':id')
  async findOne(id: string): Promise<ResponseObject> {
    return ResponseObject.success(await this.reportService.findOne(id));
  }

  @Post()
  async createReport(@Body() report: Report): Promise<ResponseObject> {
    const newReport: Report = await this.reportService.create(report);
    if (!newReport) {
      return ResponseObject.badReqError("Can't create report");
    }
    return ResponseObject.success(newReport);
  }

  @Patch(':id')
  async updateReport(
    @Body() report: Report,
    @Param('id') id: string,
  ): Promise<ResponseObject> {
    const updatedReport: Report = await this.reportService.update(id, report);
    if (!updatedReport) {
      return ResponseObject.badReqError("Can't update report");
    }
    return ResponseObject.success(updatedReport);
  }
}
