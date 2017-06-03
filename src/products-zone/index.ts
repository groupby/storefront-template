import { alias, tag, ProductTransformer, Store, Structure, Tag } from '@storefront/core';
import Zone from '../zone';

@alias('zone')
@tag('gb-products-zone', require('./index.html'))
class ProductsZone {

  structure: Structure = this.config.structure;

  init() {
    const { products } = this.props.zone;
    this.state = {
      ...this.props.zone,
      products: products.map(ProductTransformer.transformer(this.structure))
    };
  }
}

interface ProductsZone extends Tag<ProductsZone.Props> { }
namespace ProductsZone {
  export interface Props extends Zone.Props {
    zone: Store.ProductsZone;
  }
}

export default ProductsZone;
