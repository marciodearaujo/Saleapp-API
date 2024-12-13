import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Sale} from './sale.model';

@model({
  settings: {
    mysql: {
      table: "payment_portion"
    }
  }
}
)
export class PaymentPortion extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
    mysql: {
      column: 'payment_date_limit'
    }
  })
  paymentDateLimit: string;

  @property({
    type: 'number',
    required: true,
  })
  value: number;

  @property({
    type: 'string',
  })
  status: string;

  @property({
    type: 'number',
    required: true,
  })
  portion: number;

  @property({
    type: 'date',
    mysql: {
      column: 'payment-date'
    }
  })
  paymentDate?: string;

  @belongsTo(() => Sale,{keyFrom: 'saleId'}, {name: 'sale_id'})
  saleId: number;

  constructor(data?: Partial<PaymentPortion>) {
    super(data);
  }
}

export interface PaymentPortionRelations {
  // describe navigational properties here
}

export type PaymentPortionWithRelations = PaymentPortion & PaymentPortionRelations;
