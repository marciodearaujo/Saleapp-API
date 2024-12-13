import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {PaymentPortionRepository} from '../repositories';
import {repository} from '@loopback/repository';
import {PaymentPortion, Sale} from '../models';

@injectable({scope: BindingScope.TRANSIENT})
export class RegisterPortionService {

  @repository(PaymentPortionRepository)
    public paymentPortionRepository: PaymentPortionRepository

  constructor(/* Add @inject to inject parameters */) {}

  async save(portionsNumber:number,sale:Sale,portionPayDaylimit:number){
      let portion:number
      return new Promise(async (resolve)=>{
        try{
        for(portion=1;portion<=portionsNumber;portion++){
          await this.paymentPortionRepository.create({
            paymentDateLimit:this.calculatePortionPaymentDateLimit(sale,portionPayDaylimit,portion).toISOString(),
            portion,
            value:sale.total?sale.total/portionsNumber:0,
            saleId:sale.id
            })
        }
        resolve("portions saved")
      }catch(error){
        throw new Error("Ocorreu um erro ao criar parcela: "+portion+":"+error)
      }
      })
    }

    calculatePortionPaymentDateLimit(sale:Sale,portionPayDayLimit:number,portion:number){
      const portionPayDateLimit= new Date(sale.saleDate)
      portionPayDateLimit.setMonth(portionPayDateLimit.getMonth()+portion)
      portionPayDateLimit.setDate(portionPayDayLimit-1)
    return portionPayDateLimit
  }
}
