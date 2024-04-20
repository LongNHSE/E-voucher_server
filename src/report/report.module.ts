import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Report, ReportSchema } from './schema/report.schema';
import { ReportTypeModule } from 'src/reportType/reportType.module';
import { VoucherSellModule } from 'src/voucher-sell/voucher-sell.module';
import { UserModule } from 'src/user/user.module';
import {
  ReportType,
  reportTypeSchema,
} from 'src/reportType/schema/reportType.schema';
import {
  VoucherSell,
  voucherSellSchema,
} from 'src/voucher-sell/schema/voucher-sell.schema';
import { User, userSchema } from 'src/user/schema/user.schema';

@Module({
  imports: [
    VoucherSellModule,
    ReportTypeModule,
    UserModule,
    MongooseModule.forFeature([
      { name: Report.name, schema: ReportSchema },
      { name: VoucherSell.name, schema: voucherSellSchema },
      { name: ReportType.name, schema: reportTypeSchema },
      { name: User.name, schema: userSchema },
    ]),
  ],
  controllers: [ReportController],
  providers: [ReportService],
})
export class ReportModule {}
