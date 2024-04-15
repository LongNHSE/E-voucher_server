import { Module } from '@nestjs/common';
import { TimeLimitController } from './timeLimit.controller';
import { TimeLimitService } from './timeLimit.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TimeLimit, TimeLimitSchema } from './schema/timeLimit.schema';

@Module({
  controllers: [TimeLimitController],
  providers: [TimeLimitService],
  imports: [
    MongooseModule.forFeature([
      { name: TimeLimit.name, schema: TimeLimitSchema },
    ]),
  ],
})
export class TimeLimitModule {}
