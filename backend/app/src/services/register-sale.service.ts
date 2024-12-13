import {injectable,service, BindingScope} from '@loopback/core';
import {SaleRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {Sale, SaleJsonInput} from '../models';
import {RegisterItemService} from './register-item.service';
import {RegisterPortionService} from './register-portion.service';

@injectable({scope: BindingScope.TRANSIENT})
export class RegisterSaleService {


  constructor(@repository(SaleRepository)
  public saleRepository: SaleRepository,

  @service()
  public registerItemService:RegisterItemService,

  @service()
  public registerPortionService:RegisterPortionService,) {}


  async save(saleJsonInput:SaleJsonInput){
    const {products,portionPayDayLimit,portionsNumber, ...sale}=saleJsonInput
    let savedSale:Sale | null = null
    try{
      const total=products.reduce((total,product)=>total+(product.amount*product.price),0)
      savedSale= await this.saleRepository.create({...sale,total,status:portionsNumber===0?'paid':'not paid'})
      await this.registerItemService.save(products,savedSale.id)
      await this.registerPortionService.save(portionsNumber,savedSale,portionPayDayLimit)
      return savedSale
    }catch(error){
      console.log("Ocorreu um erro ao registrar a venda:"+error)
      if(savedSale)
        this.saleRepository.delete(savedSale)
      throw error
    }
  }
}
