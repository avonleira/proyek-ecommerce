import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from 'src/typeorm/entities/Faq';
import { Repository } from 'typeorm';
import { updatePromoDto } from '../promo/dtos/UpdatePromo.dto';
import { CreateFaqDto } from './dtos/CreateFaq.dto';
import { UpdateFaqDto } from './dtos/UpdateFaq.dto';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq) private faqRepository: Repository<Faq>,
  ) {}

  async getAll() {
    return await this.faqRepository.find()
  }

  async getById(id: number) {
    return await this.faqRepository.findOneBy({id: id})
  }

  async createFaq(createFaqDto: CreateFaqDto) {
    return await this.faqRepository.save(createFaqDto);
  }

  async editFaq(id: number, updateFaqDto: UpdateFaqDto) {
    const result =  await this.faqRepository.update({id: id}, updateFaqDto)
    const faq = await this.faqRepository.findOneBy({id: id})
    if (!faq)
      throw new NotFoundException('Faq not found')
    if (!result)
      throw new InternalServerErrorException('Failed to delete')
    return await this.faqRepository.findOneBy({id: id})
  }

  async deleteFaq(id: number) {
    const faq = await this.faqRepository.findOneBy({id: id})
    if (!faq)
      throw new NotFoundException('Faq not found')
    return await this.faqRepository.delete(id);
  }
}
