import {Model, model, property} from '@loopback/repository';
import {Item} from './item.model';
import {Product} from './product.model';

@model()
export class SaleJsonInput extends Model {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'date',
    required: true,
  })
  saleDate: string;

  @property({
    type: 'number',
    required: true,
  })
  clientId: number;

  @property({
    type: 'number',
    required: true,
  })
  portionsNumber: number;

  @property({
    type: 'number',
    required: true,
  })
  portionPayDayLimit: number;

  @property({
    type: 'array',
    itemType: 'object',
    required: true,
  })
  products: Product[];


  constructor(data?: Partial<SaleJsonInput>) {
    super(data);
  }
}

export interface SaleJsonInputRelations {
  // describe navigational properties here
}

export type SaleJsonInputWithRelations = SaleJsonInput & SaleJsonInputRelations;
