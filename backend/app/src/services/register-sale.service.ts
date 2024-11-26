import {injectable,inject, BindingScope} from '@loopback/core';
import {SaleRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {SaleJsonInput} from '../models';
import {RegisterItemService} from './register-item.service';

@injectable({scope: BindingScope.TRANSIENT})
export class RegisterSaleService {


  constructor(@repository("SaleRpeository")
  private saleRepository: SaleRepository,

  @inject("RegisterItemService")
  private registerItemService:RegisterItemService) {}

  async save(saleJsonInput:SaleJsonInput){
    const {items, ...sale}=saleJsonInput
    const savedSale= await this.saleRepository.create(sale)
    const savedItems= await this.registerItemService.save(items)
    return savedSale
  }
}
