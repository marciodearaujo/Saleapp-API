import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Sale, SaleRelations, Client, Product, Item, PaymentPortion} from '../models';
import {ClientRepository} from './client.repository';
import {ItemRepository} from './item.repository';
import {ProductRepository} from './product.repository';
import {PaymentPortionRepository} from './payment-portion.repository';

export class SaleRepository extends DefaultCrudRepository<
  Sale,
  typeof Sale.prototype.id,
  SaleRelations
> {

  public readonly client: BelongsToAccessor<Client, typeof Sale.prototype.id>;

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.id,
          Item,
          typeof Sale.prototype.id
        >;

  public readonly items: HasManyRepositoryFactory<Item, typeof Sale.prototype.id>;

  public readonly paymentPortions: HasManyRepositoryFactory<PaymentPortion, typeof Sale.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('PaymentPortionRepository') protected paymentPortionRepositoryGetter: Getter<PaymentPortionRepository>,
  ) {
    super(Sale, dataSource);
    this.paymentPortions = this.createHasManyRepositoryFactoryFor('paymentPortions', paymentPortionRepositoryGetter,);
    this.registerInclusionResolver('paymentPortions', this.paymentPortions.inclusionResolver);
    this.items = this.createHasManyRepositoryFactoryFor('items', itemRepositoryGetter,);
    this.registerInclusionResolver('items', this.items.inclusionResolver);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, itemRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
  }
}
