import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from 'src/typeorm/entities/Faq';
import { Repository } from 'typeorm';

@Injectable()
export class FaqService {
  constructor(
    @InjectRepository(Faq) private faqRepository: Repository<Faq>,
  ) {}

  async getAll() {
    return await this.faqRepository.find()
  }
}
