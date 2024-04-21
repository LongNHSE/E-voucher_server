import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ReportModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
