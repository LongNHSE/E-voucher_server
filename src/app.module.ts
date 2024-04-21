import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { VoucherModule } from './voucher/voucher.module';
import { OtpModule } from './otp/otp.module';
import { MailModule } from './mail/mail.module';
import { VoucherSellModule } from './voucher-sell/voucher-sell.module';
import { InvoiceModule } from './invoice/invoice.module';
import { TimeLimitModule } from './timeLimit/timeLimit.module';
import { ReportTypeModule } from './reportType/reportType.module';
import { VnpayController } from './vnpay/vnpay.controller';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    VoucherModule,
    VoucherSellModule,
    InvoiceModule,
    TimeLimitModule,
    ReportModule,
    ReportTypeModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    OtpModule,
    MailModule,
  ],
  controllers: [AppController, VnpayController],
  providers: [AppService],
})
export class AppModule {}
