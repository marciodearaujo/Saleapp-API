import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Client} from './client.model';
import {Product} from './product.model';
import {Item} from './item.model';

@model()
export class Sale extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
    mysql:{
      column: 'sale_date'
    }
  })
  saleDate: string;

  @belongsTo(() => Client, {keyFrom: 'clientId'}, {name: 'client_id'})
  clientId: number;

  @hasMany(() => Product, {through: {model: () => Item}})
  products: Product[];

  constructor(data?: Partial<Sale>) {
    super(data);
  }
}

export interface SaleRelations {
  // describe navigational properties here
}

export type SaleWithRelations = Sale & SaleRelations;
