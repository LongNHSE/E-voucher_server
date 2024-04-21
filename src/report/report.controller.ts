import { Controller, Get } from '@nestjs/common';
import { Report } from './schema/report.schema';
import { reportService } from './report.service';

@Controller('report')
export class ReportController {
  constructor(private readonly reportService: reportService) {}

  @Get()
  async findAll(): Promise<Report[]> {
    return this.reportService.findAll();
  }
}
