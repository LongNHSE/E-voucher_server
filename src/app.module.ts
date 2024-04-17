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

@Module({
  imports: [
    AuthModule,
    UserModule,
    VoucherModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    ConfigModule.forRoot(),
    OtpModule,
    MailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
