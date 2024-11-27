import {Entity, model, property, hasMany} from '@loopback/repository';
import {Sale} from './sale.model';
import {Item} from './item.model';

@model({
  settings:{
    mysql:{
      table:"product"
    }
  }
})
export class Product extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'string',
    default: 'both',
  })
  sex?: string;

  @hasMany(() => Sale, {through: {model: () => Item}})
  sales: Sale[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
