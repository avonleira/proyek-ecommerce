import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promo } from 'src/typeorm/entities/Promo';
import { Repository } from 'typeorm';
import { CreatePromoDto } from './dtos/CreatePromo.dto';

@Injectable()
export class PromoService {
  constructor(@InjectRepository(Promo) private readonly promoRepository: Repository<Promo>) {

  }

  async getAll() {
    return await this.promoRepository.find();
  }

  async getById(id: number) {
    return await this.promoRepository.findOneBy({id: id})
  }

  async createPromo(createPromoDto: CreatePromoDto) {
    throw new NotImplementedException();
  }

  async editPromo() {
    throw new NotImplementedException();
  }

  async deletePromo() {
    throw new NotImplementedException();
  }
}
