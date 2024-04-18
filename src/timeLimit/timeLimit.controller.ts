import { Body, Controller, Get, Patch, Post } from '@nestjs/common';
import { TimeLimitService } from './timeLimit.service';
import { TimeLimit } from './schema/timeLimit.schema';

@Controller('TimeLimit')
export class TimeLimitController {
  constructor(private readonly timeLimitService: TimeLimitService) {}
  @Get()
  async findAll(): Promise<TimeLimit[]> {
    return this.timeLimitService.findAll();
  }
  @Post()
  async create(@Body() timeLimit: TimeLimit): Promise<TimeLimit> {
    return this.timeLimitService.create(timeLimit);
  }
  @Patch(':id')
  async update(id: string, timeLimit: TimeLimit): Promise<TimeLimit> {
    return this.timeLimitService.update(id, timeLimit);
  }
}
