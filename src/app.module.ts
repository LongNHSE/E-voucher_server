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
import { TimeLimitModule } from './timeLimit/timeLimit.module';
import { ReportTypeModule } from './reportType/reportType.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    VoucherModule,
    TimeLimitModule,
    ReportTypeModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.CONNECTION_STRING),
    OtpModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
