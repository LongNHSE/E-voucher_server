import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { reportService } from './report.service';
import { Mongoose } from 'mongoose';
import { Report, reportSchema } from './schema/report.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ReportController],
  providers: [reportService],
  imports: [
    MongooseModule.forFeature([{ name: Report.name, schema: reportSchema }]),
  ],
})
export class ReportModule {}
