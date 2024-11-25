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
Product,
Item,
Sale,
} from '../models';
import {ProductRepository} from '../repositories';

export class ProductSaleController {
  constructor(
    @repository(ProductRepository) protected productRepository: ProductRepository,
  ) { }

  @get('/products/{id}/sales', {
    responses: {
      '200': {
        description: 'Array of Product has many Sale through Item',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sale)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<Sale>,
  ): Promise<Sale[]> {
    return this.productRepository.sales(id).find(filter);
  }

  @post('/products/{id}/sales', {
    responses: {
      '200': {
        description: 'create a Sale model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sale)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Product.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {
            title: 'NewSaleInProduct',
            exclude: ['id'],
          }),
        },
      },
    }) sale: Omit<Sale, 'id'>,
  ): Promise<Sale> {
    return this.productRepository.sales(id).create(sale);
  }

  @patch('/products/{id}/sales', {
    responses: {
      '200': {
        description: 'Product.Sale PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {partial: true}),
        },
      },
    })
    sale: Partial<Sale>,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.productRepository.sales(id).patch(sale, where);
  }

  @del('/products/{id}/sales', {
    responses: {
      '200': {
        description: 'Product.Sale DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.productRepository.sales(id).delete(where);
  }
}
