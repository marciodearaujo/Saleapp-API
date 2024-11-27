import {Entity, model, property, hasMany} from '@loopback/repository';
import {Sale} from './sale.model';
import { table } from 'console';

@model({
  settings:{
    mysql:{
      table:"client"
    }
  }
} 
)
export class Client extends Entity {
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
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @hasMany(() => Sale)
  sales: Sale[];

  constructor(data?: Partial<Client>) {
    super(data);
  }
}

export interface ClientRelations {
  // describe navigational properties here
}

export type ClientWithRelations = Client & ClientRelations;
