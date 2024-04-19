import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
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

  @Post()
  async create(@Body() timeLimit: TimeLimit): Promise<ResponseObject> {
    const duplicateTimeLimit: TimeLimit[] = await this.timeLimitService.find(
      timeLimit.duration,
    );
    if (duplicateTimeLimit.length > 0) {
      return ResponseObject.error('Duplicate duration of time limit');
    }
    const newTimeLimit: TimeLimit =
      await this.timeLimitService.create(timeLimit);
    if (!newTimeLimit) {
      return ResponseObject.error("Can't create time limit");
    }
    return ResponseObject.success(newTimeLimit);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body('isActive') isActive: boolean,
  ): Promise<ResponseObject> {
    const updatedTimeLimit: TimeLimit = await this.timeLimitService.update(
      id,
      isActive,
    );
    if (!updatedTimeLimit) {
      return ResponseObject.error("Can't update time limit");
    }
    return ResponseObject.success(updatedTimeLimit);
  }
}
