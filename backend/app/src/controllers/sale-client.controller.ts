import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sale,
  Client,
} from '../models';
import {SaleRepository} from '../repositories';

export class SaleClientController {
  constructor(
    @repository(SaleRepository)
    public saleRepository: SaleRepository,
  ) { }

  @get('/sales/{id}/client', {
    responses: {
      '200': {
        description: 'Client belonging to Sale',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Client),
          },
        },
      },
    },
  })
  async getClient(
    @param.path.number('id') id: typeof Sale.prototype.id,
  ): Promise<Client> {
    return this.saleRepository.client(id);
  }
}
