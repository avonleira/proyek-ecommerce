import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { FaqService } from './faq.service';

@Controller('admin/master/faq')
export class FaqController {
  constructor(private faqService: FaqService) {

  }

  @Get()
  async getAll() {
    return await this.faqService.getAll()
  }
  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number) {
    
  }
  @Post()
  addFaq(@Body() createFaq: any) {
    
  }
}
