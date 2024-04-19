import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ReportTypeController } from './reportType.controller';
import { ReportTypeService } from './reportType.service';
import { reportTypeSchema } from './schema/reportType.schema';

@Module({
  controllers: [ReportTypeController],
  providers: [ReportTypeService],
  imports: [
    MongooseModule.forFeature([
      { name: 'ReportType', schema: reportTypeSchema },
    ]),
  ],
})
export class ReportTypeModule {}
