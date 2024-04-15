import { Controller, Get } from '@nestjs/common';
import { invoiceService } from './invoice.service';
import { Invoice } from './schema/invoice.schema';

@Controller('invoice')
export class invoiceController {
  constructor(private readonly invoiceService: invoiceService) {}

  @Get()
  async findAll(): Promise<Invoice[]> {
    return this.invoiceService.findAll();
  }
}
