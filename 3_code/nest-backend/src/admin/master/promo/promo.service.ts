import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Promo } from 'src/typeorm/entities/Promo';
import { Repository } from 'typeorm';
import { CreatePromoDto } from './dtos/CreatePromo.dto';
import { updatePromoDto } from './dtos/UpdatePromo.dto';

@Injectable()
export class PromoService {
  constructor(@InjectRepository(Promo) private readonly promoRepository: Repository<Promo>) {

  }

  async getAll() {
    return await this.promoRepository.find();
  }

  async getById(id: number) {
    const promo = await this.promoRepository.findOneBy({id: id})
    if (!promo)
      throw new NotFoundException("Promo not found")
    return promo
  }

  async createPromo(createPromoDto: CreatePromoDto) {
    return await this.promoRepository.save(createPromoDto);
  }

  async editPromo(id: number, updatePromoDto: updatePromoDto) {
    const promo = await this.promoRepository.findOneBy({id: id})
    if (!promo)
      throw new NotFoundException("Promo not found")
    const result = await this.promoRepository.update({id: id}, updatePromoDto)
    if (!result.affected)
      throw new InternalServerErrorException("Failed to update")
    return await this.promoRepository.findOneBy({id: id})
  }

  async deletePromo(id: number) {
    const promo = await this.promoRepository.findOneBy({id: id})
    if (!promo)
      throw new NotFoundException("Promo not found")
    const result = await this.promoRepository.delete({id: id})
    if (!result.affected)
      throw new InternalServerErrorException("Failed to delete")
    return result
  }
}
