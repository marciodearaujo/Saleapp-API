import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ItemRepository} from '../repositories';
import {Item} from '../models';



@injectable({scope: BindingScope.TRANSIENT})
export class RegisterItemService {

  @repository(ItemRepository)
  public itemRepository: ItemRepository

  constructor() {}

  /*
   * Add service methods here
   */

  async save(items:Partial<Item>[],saleId?:number,){
    return new Promise((resolve)=>{
      items.map(async (item,index)=>{
        try{
          await this.itemRepository.create({
            saleId,
            ...item
          })
          if(items.length===index)
            resolve("Items saved!")
        }catch(error){
          throw new Error("Ocorreu um erro ao criar o item "+item+":"+error)
        }
      })
    })
  }
}
