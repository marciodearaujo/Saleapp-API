import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {ItemRepository} from '../repositories';
import {Item} from '../models';



@injectable({scope: BindingScope.TRANSIENT})
export class RegisterItemService {

  @repository("ItemRpeository")
  private itemRepository: ItemRepository

  constructor() {}

  /*
   * Add service methods here
   */

  async save(items:Item[]):Promise<Array<Item>>{
    return new Promise((resolve,reject)=>{
      let savedItems:Item[]=[]
      items.map(async (item,index)=>{
        try{
          const savedItem= await this.itemRepository.create(item)
          items.push(savedItem)
          if(items.length===index)
            resolve(savedItems)
        }catch(error){
          reject("Ocorreu um erro ao criar o item "+item.id+":"+error)
        }
      })
    })
  }
}
