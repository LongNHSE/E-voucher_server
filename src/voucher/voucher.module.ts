import { Module } from '@nestjs/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import { Mongoose } from 'mongoose';
import { Voucher, voucherSchema } from './schema/voucher.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/user/user.service';
import { User, userSchema } from 'src/user/schema/user.schema';
import { UserModule } from 'src/user/user.module';

@Module({
  controllers: [VoucherController],
  providers: [VoucherService],
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Voucher.name, schema: voucherSchema },
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
})
export class VoucherModule {}
