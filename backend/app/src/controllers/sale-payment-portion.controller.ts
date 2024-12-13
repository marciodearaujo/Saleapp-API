import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Sale,
  PaymentPortion,
} from '../models';
import {SaleRepository} from '../repositories';

export class SalePaymentPortionController {
  constructor(
    @repository(SaleRepository) protected saleRepository: SaleRepository,
  ) { }

  @get('/sales/{id}/payment-portions', {
    responses: {
      '200': {
        description: 'Array of Sale has many PaymentPortion',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(PaymentPortion)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<PaymentPortion>,
  ): Promise<PaymentPortion[]> {
    return this.saleRepository.paymentPortions(id).find(filter);
  }

  @post('/sales/{id}/payment-portions', {
    responses: {
      '200': {
        description: 'Sale model instance',
        content: {'application/json': {schema: getModelSchemaRef(PaymentPortion)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Sale.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentPortion, {
            title: 'NewPaymentPortionInSale',
            exclude: ['id'],
            optional: ['saleId']
          }),
        },
      },
    }) paymentPortion: Omit<PaymentPortion, 'id'>,
  ): Promise<PaymentPortion> {
    return this.saleRepository.paymentPortions(id).create(paymentPortion);
  }

  @patch('/sales/{id}/payment-portions', {
    responses: {
      '200': {
        description: 'Sale.PaymentPortion PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(PaymentPortion, {partial: true}),
        },
      },
    })
    paymentPortion: Partial<PaymentPortion>,
    @param.query.object('where', getWhereSchemaFor(PaymentPortion)) where?: Where<PaymentPortion>,
  ): Promise<Count> {
    return this.saleRepository.paymentPortions(id).patch(paymentPortion, where);
  }

  @del('/sales/{id}/payment-portions', {
    responses: {
      '200': {
        description: 'Sale.PaymentPortion DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(PaymentPortion)) where?: Where<PaymentPortion>,
  ): Promise<Count> {
    return this.saleRepository.paymentPortions(id).delete(where);
  }
}
