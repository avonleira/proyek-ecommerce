import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CreateFaqDto } from './dtos/CreateFaq.dto';
import { UpdateFaqDto } from './dtos/UpdateFaq.dto';
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
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.faqService.getById(id);
  }

  @Post()
  async addFaq(@Body() createFaqDto: CreateFaqDto) {
    return await this.faqService.createFaq(createFaqDto);
  }

  @Put(':faq_id')
  async editFaq(
    @Param('faq_id') id: number,
    @Body() updateFaqDto: UpdateFaqDto
  ) {
    return await this.faqService.editFaq(id, updateFaqDto);
  }

  @Delete(':faq_id')
  async deleteFaq(
    @Param('faq_id') id: number
  ) {
    return await this.faqService.deleteFaq(id);
  }
}
