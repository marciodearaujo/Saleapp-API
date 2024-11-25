import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Product, ProductRelations, Sale, Item} from '../models';
import {ItemRepository} from './item.repository';
import {SaleRepository} from './sale.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly sales: HasManyThroughRepositoryFactory<Sale, typeof Sale.prototype.id,
          Item,
          typeof Product.prototype.id
        >;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('ItemRepository') protected itemRepositoryGetter: Getter<ItemRepository>, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>,
  ) {
    super(Product, dataSource);
    this.sales = this.createHasManyThroughRepositoryFactoryFor('sales', saleRepositoryGetter, itemRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
  }
}
