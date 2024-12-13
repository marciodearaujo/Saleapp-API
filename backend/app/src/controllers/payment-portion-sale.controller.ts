import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PaymentPortion,
  Sale,
} from '../models';
import {PaymentPortionRepository} from '../repositories';

export class PaymentPortionSaleController {
  constructor(
    @repository(PaymentPortionRepository)
    public paymentPortionRepository: PaymentPortionRepository,
  ) { }

  @get('/payment-portions/{id}/sale', {
    responses: {
      '200': {
        description: 'Sale belonging to PaymentPortion',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Sale),
          },
        },
      },
    },
  })
  async getSale(
    @param.path.number('id') id: typeof PaymentPortion.prototype.id,
  ): Promise<Sale> {
    return this.paymentPortionRepository.sale(id);
  }
}
