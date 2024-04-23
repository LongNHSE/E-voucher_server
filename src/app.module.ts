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
import { SocketModule } from './gateway/socket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    AuthModule,
    UserModule,
    VoucherModule,
    VoucherSellModule,
    InvoiceModule,
    TimeLimitModule,
    ReportModule,
    ReportTypeModule,
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    OtpModule,
    MailModule,
    SocketModule,
  ],
  controllers: [AppController, VnpayController],
  providers: [AppService],
})
export class AppModule {}
