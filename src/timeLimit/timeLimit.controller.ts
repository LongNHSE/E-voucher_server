import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TimeLimitService } from './timeLimit.service';
import { TimeLimit } from './schema/timeLimit.schema';
import { ResponseObject } from 'src/common/ResponseObject';

@Controller('timeLimits')
export class TimeLimitController {
  constructor(private readonly timeLimitService: TimeLimitService) {}
  @Get()
  async findAll(): Promise<ResponseObject> {
    // return this.timeLimitService.findAll();
    return ResponseObject.success(await this.timeLimitService.findAll());
  }

  @Get('search')
  async findByIsActive(
    @Query('isActive') isActive: boolean,
  ): Promise<ResponseObject> {
    const timeLimits: TimeLimit[] =
      await this.timeLimitService.findByIsActive(isActive);
    if (timeLimits.length === 0) {
      return ResponseObject.badReqError('No time limit found');
    }
    return ResponseObject.success(timeLimits);
  }

  @Post()
  async create(@Body() timeLimit: TimeLimit): Promise<ResponseObject> {
    const duplicateTimeLimit: TimeLimit[] = await this.timeLimitService.find(
      timeLimit.duration,
    );
    if (duplicateTimeLimit.length > 0) {
      return ResponseObject.badReqError('Duplicate duration of time limit');
    }
    const newTimeLimit: TimeLimit =
      await this.timeLimitService.create(timeLimit);
    if (!newTimeLimit) {
      return ResponseObject.badReqError("Can't create time limit");
    }
    return ResponseObject.success(newTimeLimit);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('duration') duration: number,
  ): Promise<ResponseObject> {
    const updatedTimeLimit: TimeLimit = await this.timeLimitService.update(
      id,
      duration,
    );
    if (!updatedTimeLimit) {
      return ResponseObject.badReqError("Can't update time limit");
    }
    return ResponseObject.success(updatedTimeLimit);
  }
}
