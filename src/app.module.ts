import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { VoucherModule } from './voucher/voucher.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    VoucherModule,
    MongooseModule.forRoot(
      'mongodb+srv://nguyenphigv23:nguyenphimb091123@cluster0.qkgf4op.mongodb.net/e-voucher',
    ),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
