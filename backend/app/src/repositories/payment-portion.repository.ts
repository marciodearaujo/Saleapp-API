import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {PaymentPortion, PaymentPortionRelations, Sale} from '../models';
import {SaleRepository} from './sale.repository';

export class PaymentPortionRepository extends DefaultCrudRepository<
  PaymentPortion,
  typeof PaymentPortion.prototype.id,
  PaymentPortionRelations
> {

  public readonly sale: BelongsToAccessor<Sale, typeof PaymentPortion.prototype.id>;

  constructor(
    @inject('datasources.Mysql') dataSource: MysqlDataSource, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>,
  ) {
    super(PaymentPortion, dataSource);
    this.sale = this.createBelongsToAccessorFor('sale', saleRepositoryGetter,);
    this.registerInclusionResolver('sale', this.sale.inclusionResolver);
  }
}
