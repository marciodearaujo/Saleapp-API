import {injectable,service, BindingScope} from '@loopback/core';
import {SaleRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Sale, SaleJsonInput} from '../models';
import {RegisterItemService} from './register-item.service';

@injectable({scope: BindingScope.TRANSIENT})
export class RegisterSaleService {


  constructor(@repository(SaleRepository)
  public saleRepository: SaleRepository,

  @service()
  public registerItemService:RegisterItemService) {}

  async save(saleJsonInput:SaleJsonInput){
    const {products, ...sale}=saleJsonInput
    let savedSale:Sale | null = null
    try{
      savedSale= await this.saleRepository.create(sale)
      await this.registerItemService.save(products,savedSale.id)
      return savedSale
    }catch(error){
      console.log("Ocorreu um erro ao registrar a venda:"+error)
      if(savedSale)
        this.saleRepository.delete(savedSale)
      throw error
    }
  }
}
