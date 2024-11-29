import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ItemRepository} from '../repositories';
import {Product} from '../models';



@injectable({scope: BindingScope.TRANSIENT})
export class RegisterItemService {

  @repository(ItemRepository)
  public itemRepository: ItemRepository

  constructor() {}

  /*
   * Add service methods here
   */

  async save(items:Partial<Product>[],saleId?:number,){
    return new Promise((resolve)=>{
      items.map(async (item,index)=>{
        try{
          await this.itemRepository.create({
            saleId,
            productId:item.id,
            amount:item.amount
          })
          if(items.length-1===index)
            resolve("Items saved!")
        }catch(error){
          throw new Error("Ocorreu um erro ao criar o item "+item+":"+error)
        }
      })
    })
  }
}
